import * as React from "react";

import { AutoValidate, AutoValidateProps } from "../AutoValidate";
import { FormContext, FormContextValue } from "../Form";

export interface AutoFocusProps extends AutoValidateProps {
    to: string,
}

export class AutoFocus extends React.PureComponent<AutoFocusProps> {
    public static readonly contextType = FormContext;

    public props: AutoFocusProps;
    public context: FormContextValue;

    public render(): JSX.Element {
        const { to, ...childProps } = this.props;
        childProps.onValidated = this.changeFocus;

        return (
            <AutoValidate {...childProps}>
                {this.props.children}
            </AutoValidate>
        );
    }

    protected changeFocus = (isGroupValid: boolean): void => {
        if (!isGroupValid) {
            return;
        }

        const element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement = this.props.to.startsWith("#")
            ? document.querySelector(this.props.to) as any
            : this.context.getDOMElement(this.props.to);

        element && element.focus();
    };
}
