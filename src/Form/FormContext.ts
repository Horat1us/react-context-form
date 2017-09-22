import * as PropTypes from "prop-types";

import {ModelValue, ModelInterface, ModelError} from "../Model";

export interface FormContext {
    values: ModelValue[];
    addError: (newError: ModelError) => void,
    hasErrors: () => boolean,

    onChange: (attribute: string, value: any) => any;
    onMount: (attribute: string, element: HTMLElement) => void;
    onUnmount: (attribute: string) => void;

    readonly validate: (group: string) => Promise<ModelError[]>,
    readonly getDOMElement:
        (attribute: string) => HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | undefined,

    isLoading: boolean,
}

export const FormContextTypes = {
    values: PropTypes.arrayOf(PropTypes.object).isRequired,
    addError: PropTypes.func.isRequired,
    hasErrors: PropTypes.func.isRequired,

    onChange: PropTypes.func.isRequired,
    onMount: PropTypes.func.isRequired,
    onUnmount: PropTypes.func.isRequired,

    validate: PropTypes.func.isRequired,
    getDOMElement: PropTypes.func.isRequired,

    isLoading: PropTypes.bool.isRequired,
};
