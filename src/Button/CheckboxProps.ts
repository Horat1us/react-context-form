import * as React from "react";

export interface CheckboxProps extends React.HTMLProps<HTMLButtonElement> {
    activeClassName?: string
}

export const CheckboxDefaultProps: {[P in keyof CheckboxProps]?: CheckboxProps[P]} = {
    className: "checkbox",
    activeClassName: "is-active"
};
