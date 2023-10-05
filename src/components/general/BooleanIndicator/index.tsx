import React from "react";
import { Tooltip, TooltipProps } from "antd";

export const BooleanIndicator: React.FC<{
  enabled: boolean;
  className?: string;
  tooltipProps?: TooltipProps & { enabled: boolean };
  node?: JSX.Element;
}> = ({ enabled, className, tooltipProps, node }) => {
  if (tooltipProps?.enabled) {
    return (
      node || (
        <Tooltip {...tooltipProps}>
          <div
            className={`${enabled ? "bg-teal-500" : "bg-rose-500"} ${
              className ? className : "w-3 h-3 rounded-full inline-block"
            } `}
          />
        </Tooltip>
      )
    );
  }

  return (
    node || (
      <div
        className={`${enabled ? "bg-teal-500" : "bg-rose-500"} ${
          className ? className : "w-3 h-3 rounded-full"
        } `}
      />
    )
  );
};
