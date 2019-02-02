import { FormContextValue } from "./FormContext";
import { ModelInterface, ModelValue } from "../Model";

export type StorageRequiredInterface = Pick<Storage, "setItem" | "getItem">;

export interface FormProps<M extends ModelInterface> {
    instantiate: () => M; /* This method will be used for creating model instance in Form state */
    method?: string; /* Name of method of model, which will be called on form submit */
    onSubmit?: (model: M, childContext: FormContextValue) => Promise<void>; // will be called if no method provided
    storageKey?: string; /* If provided Model will be saved to localStorage on unmount and loaded on mount */
    resetAfterSubmit?: boolean;
    afterSubmit?: () => void;
    storage?: StorageRequiredInterface;
    onValidate?: (groups: Array<{ name: string, isValid: boolean }>) => void;
    formRef?: (node: HTMLFormElement) => void;
}
