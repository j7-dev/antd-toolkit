import React, { ReactNode } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Form, Radio, FormItemProps, RadioGroupProps  } from "antd";
import "./styles.scss";


type TOption = { label: ReactNode; value: string; disabled?: boolean; }
const defaultOptions: TOption[] = [
	{ label: 'ALL', value: ''},
	{ label: <CheckOutlined />, value: '1' },
	{ label: <CloseOutlined />, value: '0' }
]

export const BooleanRadioButton: React.FC<{
  formItemProps: FormItemProps;
	radioGroupProps?:RadioGroupProps;
  averageWidth?: boolean;
}> = ({ formItemProps, radioGroupProps, averageWidth = true }) => {
const options = radioGroupProps?.options || defaultOptions;
  return (
    <Form.Item {...formItemProps}>
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        className={averageWidth ? `w-avg` : ""}
				options={options}
				{...radioGroupProps}
       />
    </Form.Item>
  );
};
