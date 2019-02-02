import * as React from "react";

import { ResetButtonContext, ResetButtonContextValue } from "./ResetButtonContext";

export class ResetButton extends React.PureComponent<React.HTMLProps<HTMLButtonElement>> {
    public static readonly contextType = ResetButtonContext;

    public readonly context: ResetButtonContextValue;

    public render(): React.ReactNode {
        return (
            <button
                type="button"
                {...this.props}
                onClick={this.handleClick}
            >
                {this.props.children}
            </button>
        );
    }

    protected handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        this.props.onClick && this.props.onClick(event);

        if (!event.defaultPrevented) {
            this.context.onReset();
        }
    }
}
