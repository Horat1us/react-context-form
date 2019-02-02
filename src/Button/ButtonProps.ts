import * as React from "react";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    action: any,
    activeClassName?: string
}

export const ButtonDefaultProps: {[P in keyof ButtonProps]?: ButtonProps[P]} = {
    className: "btn",
    activeClassName: "is-active"
};
