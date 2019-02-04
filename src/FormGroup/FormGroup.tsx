import * as React from "react";

import { ModelValue } from "../Model";
import { FormContext, FormContextValue } from "../Form";
import { FormGroupContext, FormGroupContextValue } from "./FormGroupContext";
import { EventInterceptorContext, EventInterceptorContextValue } from "../EventInterceptor";

export interface FormGroupProps extends React.HTMLProps<HTMLDivElement> {
    name: string; /* field name (will be passed to input) */
    idPrefix?: string; /* id prefix for input and label */

    errorClassName?: string; /* className, which will be appended when field have error */
    focusClassName?: string; /* className, which will be appended when focus on input */
    valueClassName?: string;
    ref?: any; // https://github.com/Microsoft/TypeScript/issues/16019
}

export const FormGroupDefaultProps: {[P in keyof FormGroupProps]?: FormGroupProps[P]} = {
    className: "form-group",
    idPrefix: "rcf",

    errorClassName: "has-error",
    focusClassName: "has-focus",
    valueClassName: "has-value"
};

export interface FormGroupState {
    isFocused: boolean;
}

class FormGroupLayout extends React.Component<
    FormGroupProps & { interceptor: EventInterceptorContextValue },
    FormGroupState
> {
    public static readonly defaultProps = FormGroupDefaultProps;
    public static readonly contextType = FormContext;

    public context: FormContextValue;
    public state: FormGroupState = { isFocused: false };
    public id: string;

    constructor(props) {
        super(props);

        this.id = (Date.now() + Math.random()).toString().replace(/\./g, "");
    }

    public componentWillUnmount() {
        this.context.onUnmount(this.props.name);
    }

    public handleChange = (value: any): void => this.context.onChange(this.props.name, value);
    public handleBlur = (): void => {
        this.setState({ isFocused: false });

        this.props.interceptor.onBlur && this.props.interceptor.onBlur(
            this.props.name,
            this.value ? this.value.value : undefined
        );
    };
    public handleFocus = (): void => {
        this.setState({ isFocused: true });

        this.props.interceptor.onFocus && this.props.interceptor.onFocus(
            this.props.name,
            this.value ? this.value.value : undefined
        );
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
            interceptor,
            ...childProps
        } = this.props;

        return (
            <FormGroupContext.Provider value={this.childContextValue}>
                <div className={this.className} data-name={this.props.name} {...childProps}>
                    {this.props.children}
                </div>
            </FormGroupContext.Provider>
        );
    }

    protected get childContextValue(): FormGroupContextValue {
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

export const FormGroup = (props: FormGroupProps) => (
    <EventInterceptorContext.Consumer>
        {(context: EventInterceptorContextValue) => <FormGroupLayout {...props} interceptor={context} />}
    </EventInterceptorContext.Consumer>
);
