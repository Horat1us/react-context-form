import * as React from "react";
import * as PropTypes from "prop-types";

import { AutoValidateDefaultProps, AutoValidateProps, AutoValidatePropTypes } from "./AutoValidateProps";
import { AutoValidateContext, AutoValidateContextTypes } from "./AutoValidateContext";
import { OnValidateContext, OnValidateContextTypes } from "../OnValidate";
import { InputContext } from "../Input/InputContext";
import { InputContextTypes } from "../Input";
import { ModelError } from "../Model";

export class AutoValidate extends React.Component<AutoValidateProps> {
    public static readonly propTypes = AutoValidatePropTypes;
    public static readonly defaultProps = AutoValidateDefaultProps;
    public static readonly childContextTypes = AutoValidateContextTypes;

    public static readonly contextTypes = {
        ...OnValidateContextTypes,
        ...InputContextTypes
    };

    public context: InputContext & OnValidateContext;

    public getChildContext(): AutoValidateContext {
        const isOnChange = this.props.onChange || this.props.onLength || this.props.on || this.props.always;
        const isOnBlur = this.props.onBlur || this.props.always;
        return {
            onChange: isOnChange ? this.handleChange : this.context.onChange,
            onBlur: isOnBlur ? this.handleBlur : this.context.onBlur,
        };
    }

    public componentDidMount() {
        this.context.registerValidateGroup && this.context.registerValidateGroup(this.props.groupName);
    }

    public componentWillUnmount() {
        this.context.unregisterValidateGroup && this.context.unregisterValidateGroup(this.props.groupName);
    }

    public render(): JSX.Element {
        return this.props.children;
    }

    protected handleChange = (nextValue: any): void => {
        const previousValue = this.context.value;
        const onChange = this.context.onChange(nextValue);
        if (
            this.props.always
            || this.props.onChange
            || (this.props.onLength && "string" === typeof nextValue && nextValue.length >= this.props.onLength)
            || this.props.on && this.props.on(nextValue, previousValue)
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
        this.props.onValidated && this.props.onValidated(errors.length === 0);
    }
}
