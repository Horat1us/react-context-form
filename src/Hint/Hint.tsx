import * as React from "react";
import * as PropTypes from "prop-types";

import { HintDefaultProps } from "./HintProps"
import { HintContext, HintContextTypes } from "./HintContext";

export class Hint extends React.Component<React.HTMLProps<HTMLSpanElement>> {
    public static readonly defaultProps = HintDefaultProps;
    public static readonly contextTypes = HintContextTypes;

    public context: HintContext;

    public get error(): string | void {
        return this.context.error;
    }

    public render(): React.ReactNode {
        if (!this.error && !this.props.children) {
            return null;
        }

        return (
            <span {...this.props}>
                {this.error}
                {!this.error && this.props.children}
            </span>
        );
    }
}
