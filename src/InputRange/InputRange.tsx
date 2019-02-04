import * as React from "react";

import { FormGroupContext, FormGroupContextValue } from "../FormGroup";
import { InputRangeProps } from "./InputRangeProps";

export class InputRange extends React.PureComponent<InputRangeProps> {
    public static contextType = FormGroupContext;

    public context: FormGroupContextValue;

    public render(): JSX.Element {
        return <FormGroupContext.Provider value={this.childContextValue} children={this.props.children} />;
    }

    public get childContextValue(): FormGroupContextValue {
        return {
            ...this.context,
            onChange: this.handleChange,
            onBlur: this.handleBlur
        }
    }

    protected handleChange = (value: number): void => {
        const currentLength = value.toString().length;
        const maxLength = this.props.max.toString().length;

        // simulate maxLength for input
        if (currentLength > maxLength) {
            return;
        }

        if (value > this.props.max) {
            value = this.props.max;
        }

        this.context.onChange(Number(value) || "");
    };

    protected handleBlur = (): void => {
        this.context.onBlur();

        let value = Number(this.context.value);

        if (value > this.props.max) {
            value = this.props.max;
        } else if (this.props.min && value < this.props.min) {
            value = this.props.min;
        } else {
            // dont call onChange if nothing changed
            return;
        }

        this.context.onChange(value || "");
    };
}
