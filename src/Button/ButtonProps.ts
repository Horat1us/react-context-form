import * as React from "react";
import * as PropTypes from "prop-types";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    action: any,
    activeClassName?: string
}

export const ButtonPropTypes: {[P in keyof ButtonProps]: PropTypes.Validator<any>} = {
    action: PropTypes.any.isRequired,
    activeClassName: PropTypes.string
};

export const ButtonDefaultProps: {[P in keyof ButtonProps]?: ButtonProps[P]} = {
    className: "btn",
    activeClassName: "is-active"
};
