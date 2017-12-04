import * as React from "react";
import * as PropTypes from "prop-types";

import {AutoValidateDefaultProps, AutoValidateProps, AutoValidatePropTypes} from "./AutoValidateProps";
import {InputContextTypes} from "../Input";
import {AutoValidateContext, AutoValidateContextTypes} from "./AutoValidateContext";
import {InputContext} from "../Input/InputContext";
import {ModelError} from "../Model";

export class AutoValidate extends React.Component<AutoValidateProps, undefined> {
    public static readonly propTypes = AutoValidatePropTypes;
    public static readonly defaultProps = AutoValidateDefaultProps;
    public static readonly childContextTypes = AutoValidateContextTypes;

    public static readonly contextTypes = {
        ...InputContextTypes,
        validate: PropTypes.func.isRequired,
    };

    public context: InputContext & {
        readonly validate: (group: string) => Promise<ModelError[]>;
    };

    public getChildContext(): AutoValidateContext {
        const isOnChange = this.props.onLength || this.props.on || this.props.always;
        const isOnBlur = this.props.onBlur || this.props.always;
        return {
            onChange: isOnChange ? this.handleChange : this.context.onChange,
            onBlur: isOnBlur ? this.handleBlur : this.context.onBlur,
        };
    }

    public render(): JSX.Element {
        return this.props.children;
    }

    protected handleChange = (value: any): void => {
        const onChange = this.context.onChange(value);
        if (
            this.props.always
            || this.props.onChange
            || ("string" === typeof value && value.length >= this.props.onLength)
            || this.props.on && this.props.on(value)
        ) {
            this.validate();
        }
        return onChange;
    };

    protected handleBlur = (): void => {
        this.validate();
        return this.context.onBlur();
    };

    protected async validate(): Promise<void> {
        const errors = await this.context.validate(this.props.groupName);
        this.props.onValidated(errors.length === 0);
    }
}
