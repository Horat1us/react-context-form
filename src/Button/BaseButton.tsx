import * as React from "react";
import { FormGroupContext, FormGroupContextValue } from "../FormGroup";

export abstract class BaseButton<T = any> extends React.Component<React.HTMLProps<HTMLButtonElement> & T> {
    public static contextType = FormGroupContext;

    public context: FormGroupContextValue;

    public get childProps(): React.HTMLProps<HTMLButtonElement> {
        return {
            id: this.context.id,
            ref: this.context.onMount as any,
            name: this.context.name,

            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onClick: this.handleClick,

            type: "button"
        }
    }

    protected abstract handleClick: (args: any) => any;

    protected handleBlur = (event: any): void => {
        this.props.onBlur && this.props.onBlur(event);
        if (!event.defaultPrevented) {
            this.context.onBlur();
        }
    };

    protected handleFocus = (event: any): void => {
        this.props.onFocus && this.props.onFocus(event);
        if (!event.defaultPrevented) {
            this.context.onFocus();
        }
    };
}
