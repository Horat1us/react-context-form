import * as React from 'react';

import {SubmitButtonContext, SubmitButtonProps, SubmitButtonContextTypes, SubmitButton} from "../SubmitButton";

import {SlowSubmitButtonDefaultProps, SlowSubmitButtonProps, SlowSubmitButtonPropTypes} from "./SlowSubmitButtonProps";
import {SlowSubmitButtonState} from "./SlowSubmitButtonState";

export class SlowSubmitButton extends React.Component<SlowSubmitButtonProps, SlowSubmitButtonState> {
    static propTypes = SlowSubmitButtonPropTypes;
    static defaultProps = SlowSubmitButtonDefaultProps;

    static contextTypes = SubmitButtonContextTypes;
    static childContextTypes = SubmitButtonContextTypes;
    context: SubmitButtonContext;

    getChildContext(): SubmitButtonContext {
        return {
            isLoading: this.state.isLoading,
        };
    }

    protected handleDelayEnd = (): void => {
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

    componentDidUpdate(): void {
        if (this.context.isLoading === this.state.isLoading) {
            return;
        }

        if (this.context.isLoading) {
            setTimeout(this.handleDelayEnd, this.props.duration);
        } else {
            this.state.isDelayed || this.setState({
                isLoading: false,
            });
        }
    }

    render(): JSX.Element {
        let childProps: any = Object.assign({}, this.props);
        delete childProps.duration;

        return <SubmitButton {...childProps}/>;
    }
}