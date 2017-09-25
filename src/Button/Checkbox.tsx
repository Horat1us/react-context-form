import * as React from "react";

import {BaseButton} from "./BaseButton";

export class Checkbox extends BaseButton {
    public readonly activeClassName = "active";

    public render() {
        const childProps = {
            ...this.childProps,
            ...{
                onClick: this.handleClick,
                className: this.className
            }
        };

        return (
            <button {...childProps}>
                {this.props.children}
            </button>
        );
    }

    protected handleClick = async (event: any) => {
        this.props.onClick && this.props.onClick(event);
        if (!event.defaultPrevented) {
            await this.context.onChange(!this.context.value);
        }
    };

    protected get className(): string {
        const className = this.props.className || "register-checkbox";
        const additionalClassName = !!this.context.value ? ` ${this.activeClassName}` : "";
        return `${className}${additionalClassName}`;
    }
}
