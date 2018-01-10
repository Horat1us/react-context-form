import * as React from "react";
import * as PropTypes from "prop-types";

export interface FormGroupProps extends React.HTMLProps<HTMLDivElement> {
    name: string; /* field name (will be passed to input) */
    idPrefix?: string; /* id prefix for input and label */

    errorClassName?: string, /* className, which will be appended when field have error */
    focusClassName?: string, /* className, which will be appended when focus on input */
    ref?: any; // https://github.com/Microsoft/TypeScript/issues/16019
}

export const FormGroupPropTypes: {[P in keyof FormGroupProps]: PropTypes.Validator<any>} = {
    name: PropTypes.string.isRequired,
    idPrefix: PropTypes.string,

    errorClassName: PropTypes.string,
    focusClassName: PropTypes.string,
};

export const FormGroupDefaultProps: {[P in keyof FormGroupProps]?: FormGroupProps[P]} = {
    className: "form-group",
    idPrefix: "rcf",

    errorClassName: "has-error",
    focusClassName: "has-focus",
};
