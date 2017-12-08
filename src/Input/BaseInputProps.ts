import * as React from "react";
import * as PropTypes from "prop-types";
import { TransformTypes } from "./TransformTypes";

export interface BaseInputProps<T extends HTMLElement = HTMLElement> extends React.HTMLProps<T> {
    transform?: TransformTypes
}

export const BaseInputPropTypes = {
    transform: PropTypes.oneOf(Object.keys(TransformTypes))
};

export const BaseInputDefaultProps: {[T in keyof BaseInputProps]?: BaseInputProps[T]} = {
    transform: TransformTypes.none,
    className: "form-control",
};
