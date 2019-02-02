import * as React from "react";

import { SubmitButtonContext, SubmitButton, SubmitButtonContextValue } from "../SubmitButton";
import { SlowSubmitButtonProps, SlowSubmitButtonDefaultProps } from "./SlowSubmitButtonProps";

export interface SlowSubmitButtonState {
    isLoading: boolean,
    isDelayed: boolean,
}

export class SlowSubmitButton extends React.PureComponent<SlowSubmitButtonProps, SlowSubmitButtonState> {
    public static readonly contextType = SubmitButtonContext;
    public static readonly defaultProps = SlowSubmitButtonDefaultProps;

    public context: SubmitButtonContextValue;
    public state: SlowSubmitButtonState = {
        isLoading: false,
        isDelayed: true,
    };

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
        const childProps: any = { ...this.props };
        delete childProps.duration;

        return (
            <SubmitButtonContext.Provider value={this.childContextValue}>
                <SubmitButton {...childProps} />
            </SubmitButtonContext.Provider>
        );
    }

    protected get childContextValue(): SubmitButtonContextValue {
        return {
            isLoading: this.state.isLoading,
        };
    }
}
