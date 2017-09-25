import * as PropTypes from "prop-types";
import * as React from "react";

export interface FormGroupProps extends React.HTMLProps<HTMLDivElement> {
    name: string; /* field name (will be passed to input) */
    idPrefix?: string; /* id prefix for input and label */

    errorClassName?: string, /* className, which will be appended when field have error */
    focusClassName?: string, /* className, which will be appended when focus on input */
}

export const FormGroupPropTypes = {
    name: PropTypes.string.isRequired,
    idPrefix: PropTypes.string,

    errorClassName: PropTypes.string,
    focusClassName: PropTypes.string,
};

export const FormGroupDefaultProps = {
    className: "form-group",
    idPrefix: "rcf",

    errorClassName: "has-error",
    focusClassName: "has-focus",
};
