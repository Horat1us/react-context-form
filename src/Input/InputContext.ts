import * as PropTypes from "prop-types";

export interface InputContext {
    id: string;

    name: string;
    value: any;

    onChange: (value: any) => void;
    onFocus: () => void;
    onBlur: () => void;
    onMount: (ref: HTMLElement) => void;
}

export const InputContextTypes = {
    id: PropTypes.string.isRequired,

    name: PropTypes.string.isRequired,
    value: PropTypes.any,

    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onMount: PropTypes.func.isRequired,
};
