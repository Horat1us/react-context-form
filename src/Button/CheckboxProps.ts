import * as React from "react";
import * as PropTypes from "prop-types";

export interface CheckboxProps extends React.HTMLProps<HTMLButtonElement> {
    activeClassName?: string
}

export const CheckboxPropTypes: {[P in keyof CheckboxProps]: PropTypes.Validator<any>} = {
    activeClassName: PropTypes.string
};

export const CheckboxDefaultProps: {[P in keyof CheckboxProps]?: CheckboxProps[P]} = {
    className: "checkbox",
    activeClassName: "is-active"
};
