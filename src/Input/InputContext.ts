import * as React from "react";
import * as PropTypes from "prop-types";

export interface InputContext {
    id: string;

    name: string;
    value: any;

    onChange: (value: string) => void;
    onFocus: (event: Event) => void;
    onBlur: (event: Event) => void;
}

export const InputContextTypes = {
    id: PropTypes.string.isRequired,

    name: PropTypes.string.isRequired,
    value: PropTypes.any,

    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
};
