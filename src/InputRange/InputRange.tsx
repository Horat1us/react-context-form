import * as React from "react";
import * as PropTypes from "prop-types";

import {FormGroupContextTypes, FormGroupContext} from "../FormGroup";
import {InputContextTypes, InputContext} from "../Input";
import {InputRangeProps} from "./InputRangeProps";

export class InputRange extends React.Component<InputRangeProps, undefined> {
    public static contextTypes = FormGroupContextTypes;
    public static childContextTypes = InputContextTypes;

    public context: FormGroupContext;

    public getChildContext(): InputContext {
        const {error, ...context} = this.context;

        return {
            ...context,
            ...{
                onChange: this.handleChange,
                onBlur: this.handleBlur
            }
        }
    }

    public render(): any {
        return this.props.children;
    }

    protected handleChange = (value) => {
        const currentLength = value.toString().length;
        const maxLength = this.props.max.toString().length;

        // simulate maxLength for input
        if (currentLength > maxLength) {
            value = value.substring(0, maxLength);
        }

        if (value > this.props.max) {
            value = this.props.max;
        }

        this.context.onChange(value);
    };

    protected handleBlur = () => {
        let value = Number(this.context.value);

        if (value > this.props.max) {
            value = this.props.max;
        }

        if (value < this.props.min) {
            value = this.props.min;
        }

        if (Number(this.context.value) === value) {
            return;
        }

        this.context.onChange(value);
    };
}
