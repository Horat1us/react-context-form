import * as React from "react";

export interface FormGroupContextValue<TValue = any> {
    error?: string;
    id: string;

    name: string;
    value: TValue;

    onChange: (value: TValue) => void;
    onAttributeChange: (attribute: string, value: any) => void;
    onFocus: () => void;
    onBlur: () => void;
    onMount: (ref: HTMLElement) => void;
}

export const FormGroupContextDefaultValue: FormGroupContextValue = {
    id: "",
    name: "",
    value: "",
    onChange: () => undefined,
    onAttributeChange: () => undefined,
    onFocus: () => undefined,
    onBlur: () => undefined,
    onMount: () => undefined,
};

export const FormGroupContext = React.createContext<FormGroupContextValue>(FormGroupContextDefaultValue);
