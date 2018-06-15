import * as React from "react";
import * as PropTypes from "prop-types";

import { ModelInterface } from "../Model";
import { FormContext } from "./FormContext";

export interface StorageRequiredInterface {
    getItem: (key: string) => string;
    setItem: (key: string, value: any) => void;
}

export const StorageRequiredInterfaceTypes:
    {[P in keyof StorageRequiredInterface]: PropTypes.Validator<any>} = {
        getItem: PropTypes.func.isRequired,
        setItem: PropTypes.func.isRequired
    };

export interface FormProps<M extends ModelInterface> {
    instantiate: () => M; /* This method will be used for creating model instance in Form state */
    method?: string; /* Name of method of model, which will be called on form submit */
    onSubmit?: (model: M, childContext: FormContext) => Promise<void>; // will be called if no method provided
    storageKey?: string; /* If provided Model will be saved to localStorage on unmount and loaded on mount */
    resetAfterSubmit?: boolean;
    afterSubmit?: () => void;
    storage?: StorageRequiredInterface;
}

export const FormPropTypes: {[P in keyof FormProps<any>]: PropTypes.Validator<any>} = {
    instantiate: PropTypes.func.isRequired,
    method: PropTypes.string,
    onSubmit: PropTypes.func,
    storageKey: PropTypes.string,
    resetAfterSubmit: PropTypes.bool,
    afterSubmit: PropTypes.func,
    storage: PropTypes.shape(StorageRequiredInterfaceTypes)
};
