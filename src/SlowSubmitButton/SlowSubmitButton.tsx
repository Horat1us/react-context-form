import * as React from "react";

import { SubmitButton } from "../SubmitButton";
import { SlowSubmitButtonProps, SlowSubmitButtonDefaultProps } from "./SlowSubmitButtonProps";
import { FormContext, FormContextValue } from "../Form";

export interface SlowSubmitButtonState {
    isLoading: boolean,
    isDelayed: boolean,
}

export class SlowSubmitButton extends React.PureComponent<SlowSubmitButtonProps, SlowSubmitButtonState> {
    public static readonly contextType = FormContext;
    public static readonly defaultProps = SlowSubmitButtonDefaultProps;

    public context: FormContextValue;
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
            <FormContext.Provider value={this.childContextValue}>
                <SubmitButton {...childProps} />
            </FormContext.Provider>
        );
    }

    protected get childContextValue(): FormContextValue {
        return {
            ...this.context,
            isLoading: this.state.isLoading,
        };
    }
}
