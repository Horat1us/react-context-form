import * as React from "react";
import {SubmitButtonContext, SubmitButtonContextTypes} from "./SubmitButtonContext";
import {SubmitButtonDefaultProps, SubmitButtonProps, SubmitButtonPropTypes} from "./SubmitButtonProps";
import {SubmitButtonState} from "./SubmitButtonState";

export class SubmitButton extends React.Component<SubmitButtonProps, SubmitButtonState> {
    public static propTypes = SubmitButtonPropTypes;
    public static contextTypes = SubmitButtonContextTypes;

    public context: SubmitButtonContext;
    public defaultProps = SubmitButtonDefaultProps;

    public state: SubmitButtonState = {
        width: undefined,
    };
    protected button: HTMLButtonElement | undefined;

    get children(): React.ReactNode {
        return this.context.isLoading
            ? this.props.loadingComponent
            : this.props.children;
    }

    public render(): JSX.Element {
        const {loadingComponent, ...childProps} = this.props;
        if (this.context.isLoading) {
            Object.assign(childProps, {
                className: (childProps.className || "") + " is-loading",
                width: `${this.state.width}px`,
            });
        }

        return (
            <button {...childProps} ref={this.registerButton}>
                {this.children}
            </button>
        );
    }

    protected registerButton = (e: HTMLButtonElement) => {
        this.button = e;
        this.state.width = e.offsetWidth;
    };
}
