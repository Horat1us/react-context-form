import * as React from "react";

import { HintDefaultProps } from "./HintProps"
import { FormGroupContext, FormGroupContextValue } from "../FormGroup";

export class Hint extends React.Component<React.HTMLProps<HTMLSpanElement>> {
    public static readonly defaultProps = HintDefaultProps;
    public static readonly contextType = FormGroupContext;

    public context: FormGroupContextValue;

    public get error(): string | undefined {
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
