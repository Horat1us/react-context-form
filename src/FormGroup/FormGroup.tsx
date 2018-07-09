import * as React from "react";
import * as PropTypes from "prop-types";

import { ModelValue } from "../Model";
import { FormContext, FormContextTypes } from "../Form/FormContext";
import { FormGroupContext, FormGroupContextTypes } from "./FormGroupContext";
import { EventInterceptorContext, EventInterceptorContextTypes } from "../EventInterceptor";
import { FormGroupDefaultProps, FormGroupProps, FormGroupPropTypes } from "./FormGroupProps";

export interface FormGroupState {
    isFocused: boolean;
}

export class FormGroup extends React.Component<FormGroupProps, FormGroupState> {
    public static readonly propTypes = FormGroupPropTypes;
    public static readonly defaultProps = FormGroupDefaultProps;
    public static readonly childContextTypes = FormGroupContextTypes;
    public static readonly contextTypes = {
        ...FormContextTypes,
        ...EventInterceptorContextTypes
    };

    public context: FormContext & EventInterceptorContext;
    public state: FormGroupState = {
        isFocused: false,
    };
    public id: string;

    constructor(props) {
        super(props);

        this.id = (Date.now() + Math.random()).toString().replace(/\./g, "");
    }

    public getChildContext(): FormGroupContext {
        const value = this.value;
        return {
            id: `${this.props.idPrefix}_${this.id}`,
            name: this.props.name,

            value: value ? value.value : undefined,

            onChange: this.handleChange,
            onAttributeChange: this.context.onChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            onMount: this.handleMount,

            error: value ? value.error : undefined,
        };
    }

    public componentWillUnmount() {
        this.context.onUnmount(this.props.name);
    }

    public handleChange = (value: any): void => this.context.onChange(this.props.name, value);
    public handleBlur = (): void => {
        this.setState({ isFocused: false });

        this.context.onBlur && this.context.onBlur(this.props.name, this.value ? this.value.value : undefined);
    };
    public handleFocus = (): void => {
        this.setState({ isFocused: true });

        this.context.onFocus && this.context.onFocus(this.props.name, this.value ? this.value.value : undefined);
    };

    public handleMount = (ref: HTMLElement): void => this.context.onMount(this.props.name, ref);

    public get value(): ModelValue | undefined {
        return this.context.values.find(
            (value: ModelValue) => value.attribute === this.props.name
        );
    }

    public render(): JSX.Element {
        const {
            name,
            idPrefix,
            className,
            errorClassName,
            focusClassName,
            valueClassName,
            ...childProps
        } = this.props;

        return (
            <div className={this.className} data-name={this.props.name} {...childProps}>
                {this.props.children}
            </div>
        );
    }

    protected get className(): string {
        return [
            this.props.className,
            (this.value && this.value.error)
                ? this.props.errorClassName
                : undefined,
            this.state.isFocused
                ? this.props.focusClassName
                : undefined,
            (this.value && this.value.value)
                ? this.props.valueClassName
                : undefined
        ]
            .filter((className: string) => !!className)
            .join(" ")
            .trim();
    }
}
