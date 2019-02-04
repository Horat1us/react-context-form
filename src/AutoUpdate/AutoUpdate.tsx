import * as React from "react";

import { FormContext, FormContextValue } from "../Form";
import { FormGroupContext, FormGroupContextValue } from "../FormGroup";

export interface AutoUpdateProps {
    value: (value: any) => any,
    attribute: string,
    children: JSX.Element,
    onBlur?: boolean,
    onChange?: boolean,
}

export const AutoUpdateDefaultProps = {
    onBlur: true,
    onChange: false,
};

class AutoUpdateLayout extends React.PureComponent<
    AutoUpdateProps & { getDOMElement: FormContextValue["getDOMElement"]}
> {
    public static readonly defaultProps = AutoUpdateDefaultProps;
    public static readonly contextType = FormGroupContext;

    public context: FormGroupContextValue;

    public render(): JSX.Element {
        return <FormGroupContext.Provider value={this.childContextValue} children={this.props.children} />
    }

    protected get childContextValue(): FormGroupContextValue {
        return {
            ...this.context,
            onBlur: this.handleBlur,
            onChange: this.handleChange,
        }
    }

    protected handleUpdate = (): void => {
        this.context.onAttributeChange(this.props.attribute, this.props.value(this.context.value));

        const element = this.props.getDOMElement(this.props.attribute);
        if (element instanceof HTMLElement) {
            // blur event does not triggered if element not focused
            element.focus();
            element.blur();
        }
    }

    protected handleBlur = (): void => {
        this.props.onBlur && this.handleUpdate();

        this.context.onBlur();
    }

    protected handleChange = (value: any): void => {
        this.props.onChange && this.context.onAttributeChange(this.props.attribute, this.props.value(value));

        this.context.onChange(value);
    }
}

export const AutoUpdate = ((props: AutoUpdateProps) => (
    <FormContext.Consumer>
        {(context: FormContextValue) => <AutoUpdateLayout {...props} getDOMElement={context.getDOMElement} />}
    </FormContext.Consumer>
));
