import * as React from "react";
import * as PropTypes from "prop-types";

import { BaseInput } from "./BaseInput";

export interface PasswordInputProps extends React.HTMLProps<HTMLInputElement> {
    hoverToChange?: boolean;
    clickToChange?: boolean;
}

export const PasswordInputPropTypes: {[P in keyof PasswordInputProps]: PropTypes.Validator<any>} = {
    hoverToChange: PropTypes.bool,
    clickToChange: PropTypes.bool
};

export const PasswordInputDefaultProps: {[P in keyof PasswordInputProps]?: PasswordInputProps[P]} = {
    clickToChange: true
};

export class PasswordInput extends BaseInput<PasswordInputProps> {
    public static readonly propTypes = PasswordInputPropTypes;
    public static readonly defaultProps = PasswordInputDefaultProps;

    public state: React.HTMLProps<HTMLInputElement> = {
        type: "password"
    }

    public render(): JSX.Element {
        const { hoverToChange, clickToChange, children, ...rest } = this.childProps;

        const childProps = {
            ...this.state,
            ...rest
        };

        const controlTypeProps: React.HTMLProps<HTMLButtonElement> = {
            type: "button",
            className: "btn btn_view"
        };

        if (this.props.hoverToChange) {
            controlTypeProps.onMouseOver = this.handleChangeType("text");
            controlTypeProps.onMouseLeave = this.handleChangeType("password");
        } else if (this.props.clickToChange) {
            controlTypeProps.onClick = this.handleChangeType("auto");
        }

        return (
            <div className="input-group group-password">
                <input {...childProps} />
                <button {...controlTypeProps}>
                    {this.props.children}
                </button>
            </div>
        );
    }

    protected handleChangeType = (type: "password" | "text" | "auto") => (): void => {
        if (type === "auto") {
            return this.setState((prevState: React.HTMLProps<HTMLInputElement>) => ({
                type: prevState.type === "password" ? "text" : "password"
            }));
        }

        if (this.state.type === type) {
            return;
        }

        this.setState({ type });
    }
}
