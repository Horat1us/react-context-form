import * as React from "react";
import * as PropTypes from "prop-types";
import {TransformTypes} from "./TransformTypes";

export interface BaseInputProps extends React.HTMLProps<HTMLInputElement> {
    transform?: TransformTypes;
}

export const BaseInputPropTypes: {[P in keyof BaseInputProps]: PropTypes.Validator<any>} = {
    transform: PropTypes.oneOf(Object.keys(TransformTypes))
};

export const BaseInputDefaultProps: {[P in keyof BaseInputProps]?: BaseInputProps[P]} = {
    transform: TransformTypes.none,
    className: "form-control"
};
