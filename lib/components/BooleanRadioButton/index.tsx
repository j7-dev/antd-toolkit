import React from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Form, Radio, FormItemProps } from "antd";
import "./styles.scss";

export const BooleanRadioButton: React.FC<{
  formItemProps: FormItemProps;
  averageWidth?: boolean;
}> = ({ formItemProps, averageWidth = true }) => {
  return (
    <Form.Item {...formItemProps}>
      <Radio.Group
        options={[
          { label: "ALL", value: undefined as any },
          { label: <CheckOutlined />, value: true },
          { label: <CloseOutlined />, value: false },
        ]}
        optionType="button"
        buttonStyle="solid"
        className={averageWidth ? `w-avg` : ""}
      />
    </Form.Item>
  );
};
