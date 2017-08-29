import * as React from "react";
import * as PropTypes from "prop-types";

import {AutoValidatorDefaultProps, AutoValidatorProps, AutoValidatorPropTypes} from "./AutoValidatorProps";
import {InputContextTypes} from "../Input";
import {AutoValidatorContext, AutoValidatorContextTypes} from "./AutoValidatorContext";
import {InputContext} from "../Input/InputContext";
import {ModelInterface} from "../Model/ModelInterface";

export class AutoValidator extends React.Component<AutoValidatorProps, undefined> {
    public static readonly propTypes = AutoValidatorPropTypes;
    public static readonly defaultProps = AutoValidatorDefaultProps;

    public static readonly childContextTypes = AutoValidatorContextTypes;

    public static readonly contextTypes = {
        ...InputContextTypes,
        model: PropTypes.object.isRequired,
    };

    public context: InputContext & {
        readonly model: ModelInterface,
    };

    public getChildContext(): AutoValidatorContext {
        return {
            onChange: this.props.onLength ? this.handleChange : this.context.onChange,
            onBlur: this.props.onBlur ? this.handleBlur : this.context.onBlur,
        };
    }

    public render(): JSX.Element {
        return this.props.children;
    }

    protected handleChange = async (value: any): Promise<void> => {
        if ("string" === typeof value && value.length >= this.props.onLength) {
            await this.validate();
        }
        return await this.context.onChange(value);
    };

    protected handleBlur = async (): Promise<void> => {
        await this.validate();
        return await this.context.onBlur();
    };

    protected async validate(): Promise<void> {
        const errors = await this.context.model.validate(this.props.groupName);
        this.props.onValidated(errors.length === 0);
    }
}
