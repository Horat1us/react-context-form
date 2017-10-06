import * as React from "react";
import * as PropTypes from "prop-types";

import {SubmitButtonContext, SubmitButtonProps, SubmitButtonContextTypes, SubmitButton} from "../SubmitButton";

import {SlowSubmitButtonDefaultProps, SlowSubmitButtonProps, SlowSubmitButtonPropTypes} from "./SlowSubmitButtonProps";

export interface SlowSubmitButtonState {
    isLoading: boolean,
    isDelayed: boolean,
}

export class SlowSubmitButton extends React.Component<SlowSubmitButtonProps, SlowSubmitButtonState> {
    public static readonly childContextTypes = SubmitButtonContextTypes;
    public static readonly contextTypes = SubmitButtonContextTypes;
    public static readonly propTypes = SlowSubmitButtonPropTypes;
    public static readonly defaultProps = SlowSubmitButtonDefaultProps;

    public context: SubmitButtonContext;
    public state: SlowSubmitButtonState = {
        isLoading: false,
        isDelayed: true,
    };

    public getChildContext(): SubmitButtonContext {
        return {
            isLoading: this.state.isLoading,
        };
    }

    public handleDelayEnd = (): void => {
        if (this.context.isLoading) {
            this.setState({
                isDelayed: false,
            });
        } else {
            this.setState({
                isLoading: false,
            });
        }
    };

    public componentDidUpdate(): void {
        if (this.context.isLoading === this.state.isLoading) {
            return;
        }

        if (this.context.isLoading) {
            this.setState({
                isLoading: true,
                isDelayed: true,
            });
            setTimeout(this.handleDelayEnd, this.props.duration);
        } else {
            this.state.isDelayed || this.setState({
                isLoading: false,
            });
        }
    }

    public render(): JSX.Element {
        const childProps: any = {...this.props};
        delete childProps.duration;

        return <SubmitButton {...childProps}/>;
    }
}
