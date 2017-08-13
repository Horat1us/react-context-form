import * as React from 'react';
import {SubmitButtonDefaultProps, SubmitButtonProps, SubmitButtonPropTypes,} from "./SubmitButtonProps";
import {SubmitButtonContext, SubmitButtonContextTypes,} from "./SubmitButtonContext";
import {ReactNode} from "react";
import {SubmitButtonState} from "./SubmitButtonState";

export class SubmitButton extends React.Component<SubmitButtonProps, SubmitButtonState> {
    contextTypes = SubmitButtonContextTypes;
    context: SubmitButtonContext;

    propTypes = SubmitButtonPropTypes;
    defaultProps = SubmitButtonDefaultProps;

    button: HTMLButtonElement | undefined;

    get children(): ReactNode {
        return this.context.isLoading
            ? this.props.loadingComponent
            : this.props.children;
    }

    componentDidUpdate(prevProps: SubmitButtonProps) {
        if (this.context.isLoading || prevProps.children === this.props.children) {
            return;
        }
        this.setState({width: this.button.offsetWidth});
    }

    render(): JSX.Element {
        let {loadingComponent, ...childProps} = this.props;
        if (this.context.isLoading) {
            Object.assign(childProps, {
                className: (childProps.className || '') + ' is-loading',
                width: this.state.width,
            });
        }

        return <button {...childProps} ref={e => this.button = e}>
            {this.children}
        </button>;
    }
}