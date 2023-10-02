"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanIndicator = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var BooleanIndicator = function (_a) {
    var enabled = _a.enabled, className = _a.className, tooltipProps = _a.tooltipProps, node = _a.node;
    if (tooltipProps === null || tooltipProps === void 0 ? void 0 : tooltipProps.enabled) {
        return (node || (<antd_1.Tooltip {...tooltipProps}>
                    <div className={"".concat(enabled ? 'bg-teal-500' : 'bg-rose-500', " ").concat(className ? className : 'w-3 h-3 rounded-full inline-block', " ")}/>
                </antd_1.Tooltip>));
    }
    return node || <div className={"".concat(enabled ? 'bg-teal-500' : 'bg-rose-500', " ").concat(className ? className : 'w-3 h-3 rounded-full', " ")}/>;
};
exports.BooleanIndicator = BooleanIndicator;
