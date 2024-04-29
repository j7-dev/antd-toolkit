import React, { useState } from "react";
import { Select as AntdSelect, Tooltip } from "antd";
import { TConstant } from "../types";
import { SelectProps } from "antd";
import { TooltipProps } from "antd";

type TConstantSelectProps = {
  constants: TConstant<string>[];
  hasTooltip?: boolean;
  tooltipProps?: TooltipProps;
  selectProps?: SelectProps;
}

type TConstantSelectResponse = {
  value: string;
    setValue:React.Dispatch<React.SetStateAction<string>>;
    Select:React.NamedExoticComponent;
    selectProps: SelectProps,
}

export const useConstantSelect = ({
  constants,
  hasTooltip = false,
  tooltipProps = {
    title: "Please select",
  },
  selectProps = {
    style: { width: 120 },
    defaultValue: "",
  },
}: TConstantSelectProps):TConstantSelectResponse => {
  const [value, setValue] = useState<string>(selectProps?.defaultValue || "");
  const handleChange = (theValue: string) => {
    setValue(theValue);
  };

  const defaultSelectProps = {
    ...selectProps,
    value,
    options: constants.map((c) => ({
      label: c.label,
      value: c.value,
    })),
    onChange: handleChange,
  };

  const Select = () => (
    <>
      {hasTooltip ? (
        <Tooltip {...tooltipProps}>
          <AntdSelect {...defaultSelectProps} />
        </Tooltip>
      ) : (
        <AntdSelect {...defaultSelectProps} />
      )}
    </>
  );

  return {
    value,
    setValue,
    Select: React.memo(Select),
    selectProps: defaultSelectProps,
  };
};
