import * as React from "react";
import * as PropTypes from "prop-types";

import { ResetButtonContextTypes, ResetButtonContext } from "./ResetButtonContext";

export class ResetButton extends React.Component<React.HTMLProps<HTMLButtonElement>> {
    public static readonly contextTypes = ResetButtonContextTypes;

    public readonly context: ResetButtonContext;

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
