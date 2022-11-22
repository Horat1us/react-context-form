import * as React from "react";
import * as PropTypes from "prop-types";

import { InputContext, InputContextTypes } from "../Input";

export abstract class BaseButton extends React.Component<React.HTMLProps<HTMLButtonElement>, {}> {
    public static contextTypes = InputContextTypes;

    public context: InputContext;

    public get childProps(): React.HTMLProps<HTMLButtonElement> {
        return {
            id: this.context.id,
            ref: this.context.onMount as any,
            name: this.context.name,

            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onClick: this.handleClick,

            type: "button"
        }
    }

    protected abstract handleClick: (args: any) => any;

    protected handleBlur = (event: any): void => {
        this.props.onBlur && this.props.onBlur(event);
        if (!event.defaultPrevented) {
            this.context.onBlur();
        }
    };

    protected handleFocus = (event: any): void => {
        this.props.onFocus && this.props.onFocus(event);
        if (!event.defaultPrevented) {
            this.context.onFocus();
        }
    };
}
