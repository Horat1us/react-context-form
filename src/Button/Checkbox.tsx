import * as React from "react";
import * as PropTypes from "prop-types";

import { BaseButton } from "./BaseButton";
import { CheckboxDefaultProps, CheckboxProps, CheckboxPropTypes } from "./CheckboxProps";

export class Checkbox extends BaseButton {
    public static readonly propTypes = CheckboxPropTypes;
    public static readonly defaultProps = CheckboxDefaultProps;

    public props: CheckboxProps;

    public render(): JSX.Element {
        const { activeClassName, ...HTMLProps } = this.props;

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

    protected handleClick = (event: any): void => {
        this.props.onClick && this.props.onClick(event);
        if (!event.defaultPrevented) {
            this.context.onChange(!this.context.value);
        }
    };

    protected get className(): string {
        const additionalClassName = !!this.context.value ? ` ${this.props.activeClassName}` : "";
        return `${this.props.className}${additionalClassName}`;
    }
}
