import * as React from "react";
import {InputContext, InputContextTypes} from "./InputContext";

export class Input extends React.Component<React.HTMLProps<HTMLInputElement>> {

    public static contextTypes = InputContextTypes;
    public context: InputContext;

    public render() {
        const childProps = {
            ...this.props,
            ...{
                id: this.context.id,
                onChange: this.handleChange,
                onBlur: this.handleBlur,
                onFocus: this.handleFocus,
            }
        };
        return <input {...childProps}/>;
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
            this.context.onBlur(event);
        }
    };

    protected handleFocus = (event: any) => {
        this.props.onFocus && this.props.onFocus(event);
        if (!event.defaultPrevented) {
            this.context.onFocus(event);
        }
    };
}
