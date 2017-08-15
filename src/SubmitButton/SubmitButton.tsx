import * as React from 'react';
import {SubmitButtonDefaultProps, SubmitButtonProps, SubmitButtonPropTypes,} from "./SubmitButtonProps";
import {SubmitButtonContext, SubmitButtonContextTypes,} from "./SubmitButtonContext";
import {ReactNode} from "react";
import {SubmitButtonState} from "./SubmitButtonState";

export class SubmitButton extends React.Component<SubmitButtonProps, SubmitButtonState> {
    static contextTypes = SubmitButtonContextTypes;
    context: SubmitButtonContext;

    static propTypes = SubmitButtonPropTypes;
    static defaultProps = SubmitButtonDefaultProps;

    button: HTMLButtonElement | undefined;
    state: SubmitButtonState = {};

    protected registerButton = (e: HTMLButtonElement) => {
        this.button = e;
        this.state.width = e.offsetWidth;
    };

    get children(): ReactNode {
        return this.context.isLoading
            ? this.props.loadingComponent
            : this.props.children;
    }

    render(): JSX.Element {
        let {loadingComponent, ...childProps} = this.props;
        if (this.context.isLoading) {
            Object.assign(childProps, {
                className: (childProps.className || '') + ' is-loading',
                width: this.state.width,
            });
        }

        return <button {...childProps} ref={this.registerButton}>
            {this.children}
        </button>;
    }
}