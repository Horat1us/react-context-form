import * as PropTypes from "prop-types";
import * as React from "react";
import {Input} from "../Input/Input";

export interface FormGroupProps extends React.HTMLProps<HTMLDivElement> {
    name: string;
    idPrefix?: string;
}

export const FormGroupPropTypes = {
    name: PropTypes.string.isRequired,
    idPrefix: PropTypes.string,
};

export const FormGroupDefaultProps = {
    className: "form-group",
    idPrefix: "rcf",
};
