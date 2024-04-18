import React, { ReactNode } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Form, Segmented, FormItemProps, SegmentedProps } from "antd";
import "./styles.scss";

type TOption =
  | string
  | number
  | {
      label: ReactNode;
      value: string;
      icon?: ReactNode;
      disabled?: boolean;
      className?: string;
    };
const defaultOptions: TOption[] = [
  { label: "ALL", value: "" },
  { label: <CheckOutlined />, value: "1" },
  { label: <CloseOutlined />, value: "0" },
];

export const BooleanSegmented: React.FC<{
  formItemProps: FormItemProps;
  segmentedProps?: Omit<SegmentedProps, "ref"> & React.RefAttributes<HTMLDivElement>;
  averageWidth?: boolean;
}> = ({ formItemProps, segmentedProps, averageWidth = true }) => {
  const options = segmentedProps?.options || defaultOptions;
  return (
    <Form.Item {...formItemProps}>
      <Segmented block options={options} className={averageWidth ? `w-avg` : ""} {...segmentedProps} />
    </Form.Item>
  );
};
