import * as React from "react";
import * as PropTypes from "prop-types";
import {TransformTypes} from "./TransformTypes";

export interface BaseInputProps<T extends HTMLElement> extends React.HTMLProps<T> {
    transform?: TransformTypes
}

export const BaseInputPropTypes = {
    transform: PropTypes.oneOf(Object.keys(TransformTypes))
};

export const BaseInputDefaultProps = {
    transform: TransformTypes.none
};
