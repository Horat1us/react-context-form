import * as React from "react";

import { ShowPasswordButtonProps, ShowPasswordButtonDefaultProps } from "./ShowPasswordButtonProps";
import { PasswordGroupContext, PasswordGroupContextValue } from "../PasswordGroup";

export const ShowPasswordButton = React.memo((props: ShowPasswordButtonProps) => (
    <PasswordGroupContext.Consumer>
        {(context: PasswordGroupContextValue) => {
            const { hoverToShow, clickToShow, children, ...rest } = { ...ShowPasswordButtonDefaultProps, ...props};

            const childProps = { ...rest };

            if (hoverToShow) {
                childProps.onMouseOver = context.onChangeVisibility(false);
                childProps.onMouseLeave = context.onChangeVisibility(true);
            } else if (clickToShow) {
                childProps.onClick = context.onChangeVisibility();
            }

            return (
                <button {...childProps}>
                    {children}
                </button>
            );
        }}
    </PasswordGroupContext.Consumer>
));
