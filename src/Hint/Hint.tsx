import * as React from "react";
import * as PropTypes from "prop-types";

import {HintDefaultProps} from "./HintProps"
import {HintContext, HintContextTypes} from "./HintContext";

export class Hint extends React.Component<React.HTMLProps<HTMLSpanElement>, any> {
    public static defaultProps = HintDefaultProps;

    public static contextTypes = HintContextTypes;
    public context: HintContext;

    public get error() {
        return this.context.error;
    }

    public render() {
        if (!this.error && !this.props.children) {
            return false;
        }

        return (
            <span {...this.props}>
                {this.error}
                {!this.error && this.props.children}
            </span>
        );
    }
}
