import React, { useState, useEffect } from "react";
import {
  EditFilled,
  SaveFilled,
  CloseOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { Form, Button, FormProps, Popconfirm } from "antd";
import { useDelete, BaseRecord } from "@refinedev/core";

export const useUpdateRecord = <FormatDataType extends BaseRecord>({
  rowKey,
  resource,
  onFinish,
}: {
  rowKey: keyof FormatDataType;
  resource: string;
  onFinish?: (_values: { [key: string]: any; key: React.Key }) => void;
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const { mutate: deleteFn } = useDelete();

  useEffect(() => {
    if (editingKey !== "") {
      form?.resetFields();
    }
  }, [editingKey]);

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    record: FormatDataType;
    cellInput: {
      el: React.ReactNode;
      required?: boolean;
      message?: string;
      valuePropName?: string;
    };
    dataIndex: string;
    index: number;
    children: React.ReactNode;
  }

  const isEditing = (record: FormatDataType) => {
    if (record) {
      return record?.[rowKey].toString() === editingKey;
    }
  };

  const edit = (record: FormatDataType) => {
    setEditingKey((record?.[rowKey] as React.Key).toString());
  };

  const cancel = () => {
    setEditingKey("");
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
      setEditingKey("");
    } catch (error) {
      setEditingKey("");
    }
  };

  const handleDelete = (record: FormatDataType) => () => {
    if (deleteFn && record?.id) {
      deleteFn({
        resource,
        id: record.id || "",
      });
    } else {
      console.log("deleteFn is not defined", record);
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
                message: cellInput?.message || "",
              },
            ]}
            initialValue={record?.[dataIndex]}
            valuePropName={
              cellInput?.valuePropName ? cellInput?.valuePropName : "value"
            }
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
          onClick={() => save((record?.[rowKey] as React.Key) || "")}
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
      <div className="flex flex-nowrap">
        <Button
          disabled={editingKey !== ""}
          onClick={() => edit(record)}
          type="primary"
          shape="circle"
          icon={
            <EditFilled className="text-[0.625rem] relative -top-[0.1rem]" />
          }
          size="small"
          className="shadow-none"
        />
        <Popconfirm title="Sure to delete?" onConfirm={handleDelete(record)}>
          <Button
            size="small"
            shape="circle"
            type="primary"
            className="ml-2"
            danger
            icon={<DeleteFilled />}
          />
        </Popconfirm>
      </div>
    );
  };

  return {
    formProps,
    editableTableProps: {
      components,
      rowClassName: "editable-row",
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
