import * as React from "react";

import { PasswordGroupContext, PasswordGroupContextValue } from "../PasswordGroup";

export interface ShowPasswordButtonProps extends React.HTMLProps<HTMLButtonElement> {
    hoverToShow?: boolean;
    clickToShow?: boolean;
}

export const ShowPasswordButtonDefaultProps: {[P in keyof ShowPasswordButtonProps]?: ShowPasswordButtonProps[P]} = {
    clickToShow: true,
    type: "button"
};

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
