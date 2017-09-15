import * as PropTypes from "prop-types";

export interface InputContext {
    id: string;

    name: string;
    value: any;

    onChange: (value: any) => Promise<void>;
    onAttributeChange: (attribute: string, value: any) => Promise<void>;
    onFocus: () => Promise<void>;
    onBlur: () => Promise<void>;
    onMount: (ref: HTMLElement) => Promise<void>;
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
