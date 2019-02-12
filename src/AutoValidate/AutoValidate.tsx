import * as React from "react";
import { FormContext, FormContextValue } from "../Form";
import { ModelError } from "../Model";
import { FormGroupContext, FormGroupContextValue } from "../FormGroup";

export interface AutoValidateProps {
    groupName?: string,
    children: JSX.Element,

    onBlur?: boolean,
    onChange?: boolean,
    onLength?: number,
    always?: boolean

    onValidated?: (isValid: boolean) => void,

    on?: (nextValue: string, previousValue: string) => boolean
}

export const AutoValidateDefaultProps: {[P in keyof AutoValidateProps]?: AutoValidateProps[P]} = {
    onBlur: true,
    onChange: false,
    always: false,
    onValidated: () => undefined,
};

class AutoValidateLayout extends React.PureComponent<
    AutoValidateProps & { validate: (group: string) => Promise<ModelError[]>}
> {
    public static readonly defaultProps = AutoValidateDefaultProps;
    public static readonly contextType = FormGroupContext;

    public context: FormGroupContextValue;

    public render(): JSX.Element {
        return <FormGroupContext.Provider value={this.childContextValue} children={this.props.children} />;
    }

    public get childContextValue(): FormGroupContextValue {
        const isOnChange = this.props.onChange || this.props.onLength || this.props.on || this.props.always;
        const isOnBlur = this.props.onBlur || this.props.always;
        return {
            ...this.context,
            onChange: isOnChange ? this.handleChange : this.context.onChange,
            onBlur: isOnBlur ? this.handleBlur : this.context.onBlur,
        };
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
        const errors = await this.props.validate(this.props.groupName || this.context.name);
        this.props.onValidated && this.props.onValidated(errors.length === 0);
    }
}

export const AutoValidate = (props: AutoValidateProps) => (
    <FormContext.Consumer>
        {(context: FormContextValue) => <AutoValidateLayout {...props} validate={context.validate} />}
    </FormContext.Consumer>
);
