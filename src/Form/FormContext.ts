import * as PropTypes from "prop-types";
import {ModelValue} from "../Model/ModelValue";
import {ModelInterface} from "../Model/ModelInterface";

export interface FormContext {
    values: ModelValue[];

    onChange: (attribute: string, value: any) => any;
    onMount: (attribute: string, element: HTMLElement) => void;
    onUnmount: (attribute: string) => void;

    readonly model: ModelInterface,

    isLoading: boolean,
}

export const FormContextTypes = {
    values: PropTypes.arrayOf(PropTypes.object).isRequired,

    onChange: PropTypes.func.isRequired,
    onMount: PropTypes.func.isRequired,
    onUnmount: PropTypes.func.isRequired,

    model: PropTypes.object.isRequired,

    isLoading: PropTypes.bool.isRequired,
};
