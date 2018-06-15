import * as React from "react";
import * as PropTypes from "prop-types";

import { Model, ModelError } from "../Model";
import { FormContext, FormContextTypes } from "./FormContext";
import { FormProps, FormPropTypes, StorageRequiredInterface } from "./FormProps";

import { addError } from "../helpers";

export interface FormState<M> {
    model: M;
    mounted: { [key: string]: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement; };
    isLoading: boolean;
}

declare const localStorage: StorageRequiredInterface | undefined;
export class Form<M extends Model>
    extends React.Component<React.HTMLProps<HTMLFormElement> & FormProps<M>, FormState<M>> {
    public static readonly childContextTypes = FormContextTypes;
    public static readonly propTypes = FormPropTypes;

    public state: FormState<M>;
    public storage = this.props.storage || localStorage;

    constructor(props: FormProps<M>) {
        super(props as any);

        this.state = {
            model: this.props.instantiate(),
            mounted: {},
            isLoading: false,
        };
    }

    public getChildContext(): FormContext {
        return {
            onChange: this.handleChange,
            values: this.state.model.values,

            onMount: this.handleMount,
            onUnmount: this.handleUnmount,
            onReset: this.handleReset,

            validate: this.validate,
            getDOMElement: this.getDOMElement,

            isLoading: this.state.isLoading,
            addError: this.handleErrorAdded,
            getError: this.state.model.getError,
        };
    }

    public async componentWillMount() {
        this.loadFromStorage();
        await this.state.model.get();
    }

    public async componentWillUnmount() {
        this.pushToStorage();
    }

    public handleSubmit = async (event?: Event): Promise<void> => {
        event && event.preventDefault();

        this.state.isLoading = true;
        this.forceUpdate();

        await this.state.model.validate();

        let submitError;
        if (!this.state.model.hasErrors()) {
            const action = this.props.method && this.state.model[this.props.method];
            try {
                if ("function" === (typeof action).toLowerCase()) {
                    await action()
                } else if (this.props.onSubmit) {
                    await this.props.onSubmit(this.state.model, this.getChildContext());
                }
            } catch (error) {
                submitError = error;
            }
        } else {
            const element = this.getDOMElement(this.state.model.getErrors()[0].attribute);
            element && element.focus();
            this.state.isLoading = false;
            return this.forceUpdate();
        }

        this.state.isLoading = false;
        this.forceUpdate();

        if (submitError) {
            return addError(this.getChildContext(), submitError);
        }

        this.props.resetAfterSubmit && this.state.model.reset();
        this.props.afterSubmit && this.props.afterSubmit();
    };

    public render(): JSX.Element {
        const { instantiate, onSubmit, method, storageKey, resetAfterSubmit, afterSubmit, ...childProps } = this.props;

        return (
            <form onSubmit={this.handleSubmit as any} {...childProps}>
                {this.props.children}
            </form>
        );
    }

    public getDOMElement = (attr: string): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined => (
        this.state.mounted[attr]
    );

    public loadFromStorage(): boolean {
        if (!this.props.storageKey || !this.storage) {
            return false;
        }

        let localStorageValue;
        try {
            const storage = this.storage.getItem(this.props.storageKey);
            if (!storage) {
                throw new Error();
            }
            localStorageValue = JSON.parse(storage);
        } catch (exception) {
            return false;
        }

        if (localStorageValue) {
            this.state.model.attributes()
                .filter((attribute: string) => localStorageValue.hasOwnProperty(attribute))
                .forEach((attribute: string) => this.handleChange(attribute, localStorageValue[attribute]));
            return true;
        }

        return false;
    }

    public pushToStorage(): void {
        if (!this.props.storageKey || !this.storage) {
            return;
        }

        const localStorageValue = {};
        this.state.model.attributes()
            .filter((attribute: string) => this.state.model[attribute] !== undefined)
            .forEach((attribute: string) => localStorageValue[attribute] = this.state.model[attribute]);

        this.storage.setItem(this.props.storageKey, JSON.stringify(localStorageValue));
    }

    protected handleChange = (attribute: string, value: any): void => {
        if (this.state.model[attribute] === value) {
            return;
        }
        this.state.model[attribute] = value;
        this.forceUpdate();
    };

    protected handleMount =
        (attribute: string, element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
            if (this.state.mounted[attribute] === element) {
                return;
            }
            this.state.mounted[attribute] = element;
            this.forceUpdate();
        };

    protected handleUnmount = (attribute: string): void => {
        if (this.state.mounted[attribute] === undefined) {
            return;
        }
        delete this.state.mounted[attribute];
        this.forceUpdate();
    };

    protected handleReset = (): void => {
        this.state.model.reset();
        this.forceUpdate();
    }

    protected validate = async (group: string): Promise<ModelError[]> => {
        const errorsRemoved = (this.state.model.groups()[group] || [])
            .map((attribute: string) => this.state.model.removeErrors(attribute))
            .reduce((carry: number, attributeErrorsCount: number) => carry + attributeErrorsCount, 0);

        const errors = await this.state.model.validate(group);
        if (errors.length > 0 || errorsRemoved > 0) {
            this.forceUpdate();
        }
        return errors;
    };

    protected handleErrorAdded = (newError: ModelError): void => {
        this.state.model.addError(newError);
        this.forceUpdate();
    }
}
