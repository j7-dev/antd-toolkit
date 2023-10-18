import React from "react";
import { isNumber, isString, isNull, isUndefined, isBoolean } from "lodash-es";
import { keyToWord } from "@/utils";
import { Empty, Form, Input, Button } from "antd";
import { ButtonProps } from "antd/lib";
import { EditOutlined } from "@ant-design/icons";

export type TColumn = {
  key: string;
  title: string;
  dataIndex: string;
  render?: (
    value: any,
    record: any,
    index: number,
    editable: boolean
  ) => React.ReactNode;
};

const defaultButtonProps = {
  type: "primary" as ButtonProps["type"],
  icon: <EditOutlined />,
};

export const ObjectTable: React.FC<{
  record: {
    [key: string]: any;
  };
  editable?: boolean;
  columns?: TColumn[];
  buttonProps?: ButtonProps;
}> = ({
  record,
  columns,
  editable = false,
  buttonProps = defaultButtonProps,
}) => {
  if (!record) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  const defaultColumns = Object.keys(record)
    .map((key) => {
      if (
        isNumber(record?.[key]) ||
        isString(record?.[key]) ||
        isNull(record?.[key]) ||
        isUndefined(record?.[key]) ||
        isBoolean(record?.[key])
      ) {
        return {
          key,
          title: keyToWord(key),
          dataIndex: key,
        };
      }

      if (
        Array.isArray(record?.[key]) &&
        (record?.[key] || []).every(
          (item: any) =>
            isNumber(item) ||
            isString(item) ||
            isNull(item) ||
            isUndefined(item)
        )
      ) {
        return {
          key,
          title: keyToWord(key),
          dataIndex: key,
          render: (
            arr: (string | number)[],
            rowRecord: any,
            _k: number,
            roweditable: boolean
          ) =>
            roweditable ? (
              <Form.Item
                className="m-0"
                name={[key]}
                initialValue={rowRecord?.[key]}
              >
                <Input />
              </Form.Item>
            ) : (
              arr.join(", ")
            ),
        };
      }
    })
    .filter((c) => !!c) as TColumn[];

  const getView = (theColumn: TColumn, j: number) => {
    const render = theColumn?.render;
    const dataIndex = theColumn?.dataIndex;

    if (render) {
      return render(record?.[dataIndex as string], record, j, editable);
    }
    return editable ? (
      <Form.Item
        className="m-0"
        name={[dataIndex]}
        initialValue={record?.[dataIndex]}
      >
        <Input />
      </Form.Item>
    ) : (
      record?.[dataIndex as string].toString()
    );
  };

  return (
    <>
      {editable && (
        <div className="flex justify-end mb-4">
          <Button {...buttonProps}>編輯</Button>
        </div>
      )}

      <table className="table table-vertical mb-4">
        <tbody>
          {(columns ? columns : defaultColumns).map((column, i) => {
            return (
              <tr key={column?.key}>
                <th>
                  <div>{column?.title as string}</div>
                </th>
                <td>{getView(column, i)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
