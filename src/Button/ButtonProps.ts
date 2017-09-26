import * as React from "react";
import * as PropTypes from "prop-types";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    action: any,
    activeClassName?: string
}

export const ButtonPropTypes = {
    action: PropTypes.any.isRequired,
    activeClassName: PropTypes.string
};

export const ButtonDefaultProps = {
    className: "btn",
    activeClassName: "is-active"
};
