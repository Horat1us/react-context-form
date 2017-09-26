import * as React from "react";
import * as PropTypes from "prop-types";

import {InputContext, InputContextTypes} from "../Input";

export abstract class BaseButton extends React.Component<React.HTMLProps<HTMLButtonElement>, undefined> {
    public static contextTypes = InputContextTypes;

    public context: InputContext;

    public get childProps(): React.HTMLProps<HTMLButtonElement> {
        return {
                id: this.context.id,
                ref: this.context.onMount,
                name: this.context.name,

                onFocus: this.handleFocus,
                onBlur: this.handleBlur,
                onClick: this.handleClick,

                type: "button"
        }
    }

    protected abstract handleClick: (args: any) => any;

    protected handleBlur = async (event: any) => {
        this.props.onBlur && this.props.onBlur(event);
        if (!event.defaultPrevented) {
            await this.context.onBlur();
        }
    };

    protected handleFocus = async (event: any) => {
        this.props.onFocus && this.props.onFocus(event);
        if (!event.defaultPrevented) {
            await this.context.onFocus();
        }
    };
}
