import * as React from "react";
import * as PropTpyes from "prop-types";

import {BaseButtonContext, BaseButtonContextTypes} from "./BaseButtonContext";

export class BaseButton extends React.Component<React.HTMLProps<HTMLButtonElement>, undefined> {
    public static contextTypes = BaseButtonContextTypes;

    public context: BaseButtonContext;

    public get childProps(): React.HTMLProps<HTMLButtonElement> {
        return {
            ...this.props,
            ...{
                id: this.context.id,
                ref: this.context.onMount,
                name: this.context.name,

                onFocus: this.handleFocus,
                onBlur: this.handleBlur,

                type: "button"
            }
        }
    }

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
