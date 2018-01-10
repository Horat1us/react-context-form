import * as React from "react";
import * as PropTypes from "prop-types";

import { AutoValidate } from "../AutoValidate/AutoValidate";
import { AutoFocusProps, AutoFocusPropTypes } from "./AutoFocusProps";
import { AutoFocusContext, AutoFocusContextTypes } from "./AutoFocusContext";

export class AutoFocus extends React.Component<AutoFocusProps> {
    public static readonly propTypes = AutoFocusPropTypes;
    public static readonly contextTypes = AutoFocusContextTypes;

    public props: AutoFocusProps;
    public context: AutoFocusContext;

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
