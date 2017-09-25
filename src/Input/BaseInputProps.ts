import * as React from "react";
import * as PropTypes from "prop-types";

export interface BaseInputProps<T extends HTMLElement> extends React.HTMLProps<T> {
    capitalize?: boolean
}

export const BaseInputPropTypes = {
    capitalize: PropTypes.bool
};

export const BaseInputDefaultProps = {
    capitalize: false
};
