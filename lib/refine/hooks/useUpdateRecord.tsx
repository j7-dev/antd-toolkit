import React, { useState } from 'react';
import { EditFilled, SaveFilled, CloseOutlined } from '@ant-design/icons';
import { Form, Button, FormProps } from 'antd';
import { BaseRecord } from '@refinedev/core';

const useUpdateRecord = <FormatDataType extends BaseRecord>({
  rowKey,
  onFinish,
}: {
  rowKey: keyof FormatDataType;
  onFinish?: (_values: { [key: string]: any; key: React.Key }) => void;
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    record: FormatDataType;
    cellInput: {
      el: React.ReactNode;
      required?: boolean;
      message?: string;
    };
    dataIndex: string;
    index: number;
    children: React.ReactNode;
  }

  const isEditing = (record: FormatDataType) => record?.[rowKey] === editingKey;

  const edit = (record: FormatDataType) => {
    setEditingKey((record?.[rowKey] as React.Key).toString());

    Object.keys(record).forEach((key) => {
      form.setFieldsValue({ [key]: record[key] });
    });
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    const values = {
      ...form.getFieldsValue(),
      key,
    };

    try {
      if (onFinish) {
        onFinish(values);
      }
      setEditingKey('');
    } catch (error) {
      setEditingKey('');
    }
  };

  const EditableCell: React.FC<EditableCellProps> = ({
    record,
    cellInput,
    dataIndex,
    index: _index,
    children,
    ...restProps
  }) => {
    const editing = isEditing(record);

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: cellInput?.required || false,
                message: cellInput?.message || '',
              },
            ]}
          >
            {cellInput?.el || <></>}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const formProps: FormProps = {
    form,
    component: false,
  };

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  const EditButton: React.FC<{ record: FormatDataType }> = ({ record }) => {
    const editable = isEditing(record);
    return editable ? (
      <div className="flex flex-nowrap">
        <Button
          onClick={() => save((record?.[rowKey] as React.Key) || '')}
          type="primary"
          shape="circle"
          icon={
            <SaveFilled className="text-[0.625rem] relative -top-[0.1rem]" />
          }
          size="small"
          className="shadow-none mr-2"
        />
        <Button
          onClick={cancel}
          type="primary"
          shape="circle"
          icon={
            <CloseOutlined className="text-[0.625rem] relative -top-[0.1rem]" />
          }
          size="small"
          className="shadow-none"
          danger
        />
      </div>
    ) : (
      <Button
        disabled={editingKey !== ''}
        onClick={() => edit(record)}
        type="primary"
        shape="circle"
        icon={<EditFilled className="text-[0.625rem] relative -top-[0.1rem]" />}
        size="small"
        className="shadow-none"
      />
    );
  };

  return {
    formProps,
    editableTableProps: {
      components,
      rowClassName: 'editable-row',
    },
    editingKey,
    EditButton: React.memo(EditButton),
    form,
    isEditing,
    edit: (record: FormatDataType) => edit(record),
    save: (recordKey: React.Key) => save(recordKey),
    cancel,
  };
};

export default useUpdateRecord;
