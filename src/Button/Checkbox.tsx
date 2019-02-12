import * as React from "react";

import { BaseButton } from "./BaseButton";

export interface CheckboxProps extends React.HTMLProps<HTMLButtonElement> {
    activeClassName?: string
}

export const CheckboxDefaultProps: {[P in keyof CheckboxProps]?: CheckboxProps[P]} = {
    className: "checkbox",
    activeClassName: "is-active"
};

export class Checkbox extends BaseButton<CheckboxProps> {
    public static readonly defaultProps = CheckboxDefaultProps;

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
