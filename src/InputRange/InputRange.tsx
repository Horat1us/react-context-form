import * as React from "react";
import * as PropTypes from "prop-types";

import { FormGroupContextTypes, FormGroupContext } from "../FormGroup";
import { InputContextTypes, InputContext } from "../Input";
import { InputRangeProps } from "./InputRangeProps";

export class InputRange extends React.Component<InputRangeProps> {
    public static contextTypes = FormGroupContextTypes;
    public static childContextTypes = InputContextTypes;

    public context: FormGroupContext;

    public getChildContext(): InputContext {
        const { error, ...context } = this.context;

        return {
            ...context,
            ...{
                onChange: this.handleChange,
                onBlur: this.handleBlur
            }
        }
    }

    public render(): JSX.Element {
        return this.props.children;
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
