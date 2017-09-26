import * as React from "react";
import * as PropTypes from "prop-types";

import {BaseButton} from "./BaseButton";
import {ButtonDefaultProps, ButtonProps, ButtonPropTypes} from "./ButtonProps";

export class Button extends BaseButton {
    public static readonly propTypes = ButtonPropTypes;
    public static readonly defaultProps = ButtonDefaultProps;

    public props: ButtonProps;

    public render() {
        const {activeClassName, ...HTMLProps} = this.props;

        const childProps = {
            ...this.childProps,
            ...HTMLProps,
            ...{
                className: this.className
            }
        };

        return (
            <button {...childProps}>
                {this.props.children}
            </button>
        );
    }

    protected handleClick = async () => await this.context.onChange(this.props.action);

    protected get className(): string {
        const additionalClassName = this.context.value === this.props.action ? ` ${this.props.activeClassName}` : "";
        return `${this.props.className}${additionalClassName}`;
    }
}
