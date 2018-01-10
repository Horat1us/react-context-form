import * as React from "react";
import * as PropTypes from "prop-types";

import { ModelInterface } from "../Model";
import { FormContext } from "./FormContext";

export interface FormProps<M extends ModelInterface> {
    instantiate: () => M; /* This method will be used for creating model instance in Form state */
    method?: string, /* Name of method of model, which will be called on form submit */
    onSubmit?: (model: M, childContext: FormContext) => Promise<void>, // will be called if no method provided
    storageKey?: string, /* If provided Model will be saved to localStorage on unmount and loaded on mount */
}

export const FormPropTypes: {[P in keyof FormProps<any>]: PropTypes.Validator<any>} = {
    instantiate: PropTypes.func.isRequired,
    method: PropTypes.string,
    onSubmit: PropTypes.func,
};
