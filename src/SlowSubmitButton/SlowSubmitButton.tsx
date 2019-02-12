import * as React from "react";

import { SubmitButton, SubmitButtonDefaultProps, SubmitButtonProps } from "../SubmitButton";
import { FormContext, FormContextValue } from "../Form";

export interface SlowSubmitButtonProps extends SubmitButtonProps {
    duration?: number,
}

export const SlowSubmitButtonDefaultProps: {[P in keyof SlowSubmitButtonProps]?: SlowSubmitButtonProps[P]} = {
    ...SubmitButtonDefaultProps,
    duration: 500
};

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

    protected timeout: number | undefined;

    public handleDelayEnd = (): void => {
        this.timeout = undefined;
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
            this.timeout = setTimeout(this.handleDelayEnd, this.props.duration);
        } else {
            this.state.isDelayed || this.setState({
                isLoading: false,
            });
        }
    }

    public componentWillUnmount(): void {
        this.timeout && clearTimeout(this.timeout);
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
