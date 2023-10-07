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
        optionType="button"
        buttonStyle="solid"
        className={averageWidth ? `w-avg` : ""}
      >
        <Radio.Button value={undefined}>ALL</Radio.Button>
        <Radio.Button value={true}>
          <CheckOutlined />
        </Radio.Button>
        <Radio.Button value={false}>
          <CloseOutlined />
        </Radio.Button>
      </Radio.Group>
    </Form.Item>
  );
};
