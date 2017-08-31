import * as PropTypes from "prop-types";
import {ModelValue} from "../Model/ModelValue";
import {ModelInterface} from "../Model/ModelInterface";
import {ModelError} from "../Model/ModelError";

export interface FormContext {
    values: ModelValue[];

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

    onChange: PropTypes.func.isRequired,
    onMount: PropTypes.func.isRequired,
    onUnmount: PropTypes.func.isRequired,

    validate: PropTypes.func.isRequired,
    getDOMElement: PropTypes.func.isRequired,

    isLoading: PropTypes.bool.isRequired,
};
