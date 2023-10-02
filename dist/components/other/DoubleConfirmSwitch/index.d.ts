import React from "react";
import { PopconfirmProps } from "antd/lib/popconfirm";
import { TooltipProps } from "antd/lib/tooltip";
import { SwitchProps } from "antd/lib/switch";
export declare const DoubleConfirmSwitch: React.FC<{
    enabled: boolean;
    popconfirmProps?: PopconfirmProps;
    tooltipProps?: TooltipProps;
    switchProps?: SwitchProps;
    onClick?: (checked: boolean) => void;
    onConfirm?: (_checked: boolean, _e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void;
    onCancel?: (_checked: boolean, _e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void;
}>;
