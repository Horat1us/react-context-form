import * as PropTypes from "prop-types";

import { ModelValue, ModelInterface, ModelError } from "../Model";

export interface FormContext {
    values: Array<ModelValue>;
    addError: (newError: ModelError) => void,
    getError: (attribute: string) => ModelError | undefined,

    onChange: (attribute: string, value: any) => any;
    onMount: (attribute: string, element: HTMLElement) => void;
    onUnmount: (attribute: string) => void;
    onReset: () => void;

    readonly validate: (group: string) => Promise<Array<ModelError>>;
    readonly getDOMElement:
    (attribute: string) => HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | void;

    isLoading: boolean;
}

export const FormContextTypes: {[P in keyof FormContext]: PropTypes.Validator<any>} = {
    values: PropTypes.arrayOf(PropTypes.object).isRequired,
    addError: PropTypes.func.isRequired,
    getError: PropTypes.func.isRequired,

    onChange: PropTypes.func.isRequired,
    onMount: PropTypes.func.isRequired,
    onUnmount: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,

    validate: PropTypes.func.isRequired,
    getDOMElement: PropTypes.func.isRequired,

    isLoading: PropTypes.bool.isRequired,
};
