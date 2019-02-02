import * as React from "react";

export interface ShowPasswordButtonProps extends React.HTMLProps<HTMLButtonElement> {
    hoverToShow?: boolean;
    clickToShow?: boolean;
}

export const ShowPasswordButtonDefaultProps: {[P in keyof ShowPasswordButtonProps]?: ShowPasswordButtonProps[P]} = {
    clickToShow: true,
    type: "button"
};
