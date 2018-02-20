import * as React from "react";

import { ShowPasswordButtonProps, ShowPasswordButtonPropTypes, ShowPasswordButtonDefaultProps } from "./ShowPasswordButtonProps";
import { PasswordGroupContextTypes, PasswordGroupContext } from "../PasswordGroup";

export class ShowPasswordButton extends React.Component<ShowPasswordButtonProps> {
    public static readonly defaultProps = ShowPasswordButtonDefaultProps;
    public static readonly contextTypes = PasswordGroupContextTypes;
    public static readonly propTypes = ShowPasswordButtonPropTypes;

    public readonly context: PasswordGroupContext;

    public render(): React.ReactNode {
        if (!this.context.onChangeVisibility) {
            return this.props.children;
        }

        const { hoverToShow, clickToShow, children, ...rest } = this.props;

        const childProps = { ...rest };

        if (hoverToShow) {
            childProps.onMouseOver = this.context.onChangeVisibility(false);
            childProps.onMouseLeave = this.context.onChangeVisibility(true);
        } else if (clickToShow) {
            childProps.onClick = this.context.onChangeVisibility();
        }

        return (
            <button {...childProps}>
                {children}
            </button>
        );
    }
}
