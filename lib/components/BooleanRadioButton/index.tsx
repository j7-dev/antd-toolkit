import React, { ReactNode } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Form, Radio, FormItemProps, RadioGroupProps  } from "antd";
import "./styles.scss";

export const BooleanRadioButton: React.FC<{
  formItemProps: FormItemProps;
	radioGroupProps?:RadioGroupProps;
  averageWidth?: boolean;
	label?: {
		all?: ReactNode
		true?: ReactNode
		false?: ReactNode
	}
}> = ({ formItemProps, radioGroupProps, averageWidth = true, label }) => {
  return (
    <Form.Item {...formItemProps}>
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        className={averageWidth ? `w-avg` : ""}
				{...radioGroupProps}
      >
        <Radio.Button value={undefined}>{label?.all || 'ALL'}</Radio.Button>
        <Radio.Button value={true}>
				{label?.true || <CheckOutlined />}
        </Radio.Button>
        <Radio.Button value={false}>
				{label?.false || <CloseOutlined />}
        </Radio.Button>
      </Radio.Group>
    </Form.Item>
  );
};
