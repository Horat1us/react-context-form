import * as React from "react";
import * as PropTypes from "prop-types";
import {ModelInterface} from "../Model";

export interface FormProps<M extends ModelInterface> {
    instantiate: () => M; /* This method will be used for creating model instance in Form state */
    method?: string, /* Name of method of model, which will be called on form submit */
    onSubmit?: (model: M) => Promise<void>, /* Function, which will be called on form submit if no method provided */
    storageKey?: string, /* If provided Model will be saved to localStorage on unmount and loaded on mount */
}

export const FormPropTypes = {
    instantiate: PropTypes.func.isRequired,
    method: PropTypes.string,
    onSubmit: PropTypes.func,
};
