import * as React from "react";
import {InputContext, InputContextTypes} from "./InputContext";

export class BaseInput<T extends HTMLElement> extends React.Component<React.HTMLProps<T>, undefined> {
    public static contextTypes = InputContextTypes;
    public context: InputContext;

    protected get childProps(): React.HTMLProps<T> {
        return {
            id: this.context.id,

            onChange: this.handleChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            className: "form-group",

            ...this.props,
        };
    }

    protected handleChange = (event: any) => {
        this.props.onChange && this.props.onChange(event);
        if (!event.defaultPrevented) {
            this.context.onChange(event.currentTarget.value);
        }
    };

    protected handleBlur = (event: any) => {
        this.props.onBlur && this.props.onBlur(event);
        if (!event.defaultPrevented) {
            this.context.onBlur();
        }
    };

    protected handleFocus = (event: any) => {
        this.props.onFocus && this.props.onFocus(event);
        if (!event.defaultPrevented) {
            this.context.onFocus();
        }
    };
}
