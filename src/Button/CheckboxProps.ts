import * as React from "react";
import * as PropTypes from "prop-types";

export interface CheckboxProps extends React.HTMLProps<HTMLButtonElement> {
    activeClassName?: string
}

export const CheckboxPropTypes = {
    activeClassName: PropTypes.string
};

export const CheckboxDefaultProps = {
    className: "checkbox",
    activeClassName: "is-active"
};
