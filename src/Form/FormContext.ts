import * as React from "react";
import { ModelValue, ModelInterface, ModelError } from "../Model";

export interface FormContextValue {
    values: ModelValue[];
    addError: (newError: ModelError) => void,
    getError: (attribute: string) => ModelError | undefined,

    onChange: (attribute: string, value: any) => any;
    onMount: (attribute: string, element: HTMLElement) => void;
    onUnmount: (attribute: string) => void;
    onReset: () => void;

    readonly validate: (group: string) => Promise<ModelError[]>;
    readonly getDOMElement:
    (attribute: string) => HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | void;

    isLoading: boolean;
}

export const FormContextDefaultValue: FormContextValue = {
    values: [],
    addError: () => undefined,
    getError: () => undefined,
    onChange: () => undefined,
    onMount: () => undefined,
    onUnmount: () => undefined,
    onReset: () => undefined,
    validate: () => Promise.resolve([]),
    getDOMElement: () => undefined,
    isLoading: false,
};

export const FormContext = React.createContext<FormContextValue>(FormContextDefaultValue);
