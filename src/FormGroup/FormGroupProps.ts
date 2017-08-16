import * as PropTypes from "prop-types";
import * as React from "react";
import {Input} from "../Input/Input";

export interface FormGroupProps extends React.HTMLProps<HTMLDivElement> {
    name: string;
}

export const FormGroupPropTypes = {
    name: PropTypes.string.isRequired,
};

export const FormGroupDefaultProps = {
    className: "form-group",
};
