import React, { useState } from "react";
import { Select as AntdSelect, Tooltip } from "antd";

import { TConstant } from "../types";
import { SelectProps } from "antd/lib/select";
import { TooltipProps } from "antd/lib/tooltip";

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
}: {
  constants: TConstant<string>[];
  hasTooltip?: boolean;
  tooltipProps?: TooltipProps;
  selectProps?: SelectProps;
}) => {
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

  const Select: React.FC = () => (
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
