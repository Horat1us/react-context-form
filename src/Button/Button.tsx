import * as React from "react";

import { BaseButton } from "./BaseButton";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    action: any,
    activeClassName?: string
}

export const ButtonDefaultProps: {[P in keyof ButtonProps]?: ButtonProps[P]} = {
    className: "btn",
    activeClassName: "is-active"
};

export class Button extends BaseButton {
    public static readonly defaultProps = ButtonDefaultProps;

    public props: ButtonProps;

    public render(): JSX.Element {
        const { action, activeClassName, ...HTMLProps } = this.props;

        const childProps = {
            ...HTMLProps,
            ...this.childProps,
            ...{
                className: this.className,
            }
        };

        return (
            <button {...childProps}>
                {this.props.children}
            </button>
        );
    }

    protected handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        this.props.onClick && this.props.onClick(event);

        if (!event.defaultPrevented) {
            this.context.onChange(this.props.action);
        }
    };

    protected get className(): string {
        const additionalClassName = this.context.value === this.props.action ? ` ${this.props.activeClassName}` : "";
        return `${this.props.className}${additionalClassName}`;
    }
}
