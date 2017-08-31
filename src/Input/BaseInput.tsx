import * as React from "react";
import {InputContext, InputContextTypes} from "./InputContext";

export class BaseInput<T extends HTMLElement> extends React.Component<React.HTMLProps<T>, undefined> {
    public static contextTypes = InputContextTypes;
    public context: InputContext;

    protected get childProps(): React.HTMLProps<T> {
        return {
            id: this.context.id,
            ref: this.context.onMount,

            name: this.context.name,

            onChange: this.handleChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,

            className: this.props.className || "form-control",
        };
    }

    protected handleChange = async (event: any) => {
        this.props.onChange && this.props.onChange(event);
        if (!event.defaultPrevented) {
            await this.context.onChange(event.currentTarget.value);
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
