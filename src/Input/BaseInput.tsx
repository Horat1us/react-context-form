import * as React from "react";
import * as PropTypes from "prop-types";

import {InputContext, InputContextTypes} from "./InputContext";
import {BaseInputDefaultProps, BaseInputProps} from "./BaseInputProps";

export class BaseInput<T extends HTMLElement> extends React.Component<BaseInputProps<T>, undefined> {
    public static contextTypes = InputContextTypes;
    public context: InputContext;
    public defaultProps: BaseInputProps<T> = BaseInputDefaultProps;

    protected get childProps(): BaseInputProps<T> {
        const {capitalize, ...childProps} = this.props;
        return {
            ...childProps,

            id: this.context.id,
            ref: this.context.onMount,

            name: this.context.name,
            value: this.context.value,

            onChange: this.handleChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,

            className: this.props.className || "form-control",
        };
    }

    protected handleChange = async (event: any) => {
        this.props.onChange && this.props.onChange(event);
        if (!event.defaultPrevented) {
            let value = event.currentTarget.value;

            value = this.props.capitalize
                ? value.toString().charAt(0).toUpperCase() + value.toString().substring(1).toLowerCase()
                : value;

            await this.context.onChange(value);
        }
    };

    protected handleBlur = async (event: any) => {
        this.props.onBlur && this.props.onBlur(event);
        if (!event.defaultPrevented) {
            await this.context.onBlur();
        }
    };

    protected handleFocus = async (event: any) => {
        this.props.onFocus && this.props.onFocus(event);
        if (!event.defaultPrevented) {
            await this.context.onFocus();
        }
    };
}
