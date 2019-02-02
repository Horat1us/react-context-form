import * as React from "react";

import { SubmitButtonDefaultProps, SubmitButtonProps } from "./SubmitButtonProps";
import { FormContext, FormContextValue } from "../Form";

export interface SubmitButtonState {
    width?: number,
}

export class SubmitButton extends React.PureComponent<SubmitButtonProps, SubmitButtonState> {
    public static readonly defaultProps = SubmitButtonDefaultProps;
    public static readonly contextType = FormContext;

    public context: FormContextValue;

    public state: SubmitButtonState = { width: undefined };
    protected button: HTMLButtonElement | undefined;

    get children(): React.ReactNode {
        return this.context.isLoading
            ? this.props.loadingComponent
            : this.props.children;
    }

    public render(): JSX.Element {
        const { loadingComponent, ...childProps } = this.props;
        if (this.context.isLoading) {
            Object.assign(childProps, {
                className: (childProps.className || "") + " is-loading",
                style: {
                    ...(this.props.style || {}),
                    width: `${this.state.width}px`,
                }
            });
        }

        return (
            <button {...childProps} ref={this.registerButton}>
                {this.children}
            </button>
        );
    }

    protected registerButton = (button: HTMLButtonElement): void => {
        if (!button) {
            return;
        }
        this.button = button;
        this.state.width = button.offsetWidth;
    };
}
