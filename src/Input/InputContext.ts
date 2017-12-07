import * as PropTypes from "prop-types";

export interface InputContext<TValue = any> {
    id: string;

    name: string;
    value: TValue;

    onChange: (value: TValue) => void;
    onAttributeChange: (attribute: string, value: any) => void;
    onFocus: () => void;
    onBlur: () => void;
    onMount: (ref: HTMLElement) => void;
}

export const InputContextTypes = {
    id: PropTypes.string.isRequired,

    name: PropTypes.string.isRequired,
    value: PropTypes.any,

    onChange: PropTypes.func.isRequired,
    onAttributeChange:  PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onMount: PropTypes.func.isRequired,
};
