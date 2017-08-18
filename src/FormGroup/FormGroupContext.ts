import * as PropTypes from "prop-types";
import {ModelError} from "../Model/ModelError";

export interface FormGroupContext {
    name: string;
    value: any;

    onChange: (value: any) => void;
    onFocus: () => void;
    onBlur: () => void;
    onMount: (ref: HTMLElement) => void;

    error: string | undefined;
}

export const FormGroupContextTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any,

    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onMount: PropTypes.func.isRequired,

    error: PropTypes.string,
};
