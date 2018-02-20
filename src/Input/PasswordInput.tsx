import * as React from "react";
import * as PropTypes from "prop-types";

import { BaseInput } from "./BaseInput";

export interface PasswordInputProps extends React.HTMLProps<HTMLInputElement> {
    hoverToShow?: boolean;
    clickToShow?: boolean;
}

export const PasswordInputPropTypes: {[P in keyof PasswordInputProps]: PropTypes.Validator<any>} = {
    hoverToShow: PropTypes.bool,
    clickToShow: PropTypes.bool
};

export const PasswordInputDefaultProps: {[P in keyof PasswordInputProps]?: PasswordInputProps[P]} = {
    clickToShow: true
};

export interface PasswordInputState {
    isHidden: boolean;
}

export class PasswordInput extends BaseInput<PasswordInputProps> {
    public static readonly propTypes = PasswordInputPropTypes;
    public static readonly defaultProps = PasswordInputDefaultProps;

    public state: PasswordInputState = {
        isHidden: true
    }

    public render(): JSX.Element {
        const { hoverToShow, clickToShow, children, ...rest } = this.childProps;

        const childProps = {
            ...rest,
            type: this.state.isHidden ? "password" : "text"
        };

        const controlTypeProps: React.HTMLProps<HTMLButtonElement> = {
            type: "button",
            className: "btn btn_view"
        };

        if (this.props.hoverToShow) {
            controlTypeProps.onMouseOver = this.handleChangeVisibility(false);
            controlTypeProps.onMouseLeave = this.handleChangeVisibility(true);
        } else if (this.props.clickToShow) {
            controlTypeProps.onClick = this.handleChangeVisibility();
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

    protected handleChangeVisibility = (state?: boolean) => (): void => {
        if (state === undefined) {
            return this.setState((prevState: PasswordInputState) => ({
                isHidden: !prevState.isHidden
            }));
        }

        if (this.state.isHidden === state) {
            return;
        }

        this.setState({ isHidden: state });
    }
}
