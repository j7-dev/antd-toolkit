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
const optionType = options.some((option) => typeof option === "object") ? "object" : "primitive";

const getInitialValue = () => {
	if (optionType === "object") {
		return (options as TOption[]).find((option) => true !== option?.disabled)?.value;
	}
	return options[0];
}

  return (
    <Form.Item initialValue={getInitialValue()} {...formItemProps}>
      <Radio.Group
				defaultValue={getInitialValue()}
        optionType="button"
        buttonStyle="solid"
        className={averageWidth ? `w-avg` : ""}
				options={options}
				{...radioGroupProps}
       />
    </Form.Item>
  );
};
