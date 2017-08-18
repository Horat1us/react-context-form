import * as React from "react";
import {FormGroupContext, FormGroupContextTypes} from "../FormGroup/FormGroupContext";

export class Input extends React.Component<React.HTMLProps<HTMLInputElement>> {

    public static contextTypes = FormGroupContextTypes;
    public context: FormGroupContext;

    public render() {
        const childProps = {
            ...this.props,
            ...{
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
