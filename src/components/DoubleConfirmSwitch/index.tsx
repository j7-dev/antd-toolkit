import React, { useState } from "react";
import { Switch, Tooltip, Popconfirm } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { PopconfirmProps } from "antd/lib/popconfirm";
import { TooltipPlacement, TooltipProps } from "antd/lib/tooltip";
import { SwitchProps } from "antd/lib/switch";

export const DoubleConfirmSwitch: React.FC<{
  enabled: boolean;
  popconfirmProps?: PopconfirmProps;
  tooltipProps?: TooltipProps;
  switchProps?: SwitchProps;
  onClick?: (checked: boolean) => void;
  onConfirm?: (
    _checked: boolean,
    _e: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => void;
  onCancel?: (
    _checked: boolean,
    _e: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => void;
}> = ({
  enabled,
  popconfirmProps,
  tooltipProps,
  switchProps,
  onClick,
  onConfirm,
  onCancel,
}) => {
  const [switchState, setSwitchState] = useState({
    checked: enabled,
    popconfirmDisabled: enabled,
  });

  const handleSwitchClick = (checked: boolean) => {
    setSwitchState({
      checked,
      popconfirmDisabled: checked,
    });
    if (onClick) {
      onClick(checked);
    }
  };

  const confirmEnable = (
    e: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => {
    setSwitchState({
      checked: switchState.checked,
      popconfirmDisabled: switchState.checked,
    });
    if (onConfirm) {
      onConfirm(switchState.checked, e);
    }
  };

  const cancelEnable = (
    e: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => {
    setSwitchState({
      checked: !switchState.checked,
      popconfirmDisabled: !switchState.checked,
    });

    if (onCancel) {
      onCancel(!switchState.checked, e);
    }
  };

  const defaultPopconfirmProps = {
    title: "Please Confirm",
    description: "Do you confirm to Enable ?",
    okText: "Confirm",
    cancelText: "Cancel",
    placement: "rightBottom" as TooltipPlacement,
    ...popconfirmProps,
    onConfirm: confirmEnable,
    onCancel: cancelEnable,
    disabled: switchState.popconfirmDisabled,
  };

  const defaultTooltipProps = {
    title: `Click to ${switchState.checked ? "Disable" : "Enable"}`,
    placement: "left" as TooltipPlacement,
    ...tooltipProps,
  };

  const defaultSwitchProps = {
    checkedChildren: <CheckOutlined />,
    unCheckedChildren: <CloseOutlined />,
    ...switchProps,
    checked: switchState.checked,
    onClick: handleSwitchClick,
  };

  return (
    <Popconfirm {...defaultPopconfirmProps}>
      <Tooltip {...defaultTooltipProps}>
        <Switch {...defaultSwitchProps} />
      </Tooltip>
    </Popconfirm>
  );
};
