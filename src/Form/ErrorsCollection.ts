import {Form} from "../components/Form";

export interface Error {
    attribute: string;
    code: string;
    details: string;
}

/**
 * Class ErrorsCollection
 */
export default class ErrorsCollection {
    private errors: Error[];
    private component: Form;

    constructor(form: Form) {
        this.component = form;
    }

    /**
     * Adds specified error to collection
     *
     * @param {Error} error
     * @returns {ErrorsCollection}
     */
    public push(error: Error): ErrorsCollection {
        this.errors.push(error);
        this.component.forceUpdate();

        return this;
    }

    /**
     * Removes all errors for attribute
     *
     * @param {string} attribute
     * @returns {ErrorsCollection}
     */
    public clean(attribute: string): ErrorsCollection {
        this.errors = this.errors.filter((error: Error) => error.attribute !== attribute);
        this.component.forceUpdate();

        return this;
    }

    /**
     * Returns array of errors for specified attribute
     *
     * @param {string} attribute
     * @returns {Error[]}
     */
    public get (attribute: string): Error[] {
        return this.errors.filter((error: Error) => error.attribute = attribute);
    }

    /**
     * Checks for existing errors on specified attribute
     *
     * @param {string} attribute
     * @returns {boolean}
     */
    public has(attribute: string): boolean {
        return this.errors.reduce(
            (previousValue: boolean, currentValue: Error) => previousValue || currentValue.attribute === attribute,
            false
        )
    }
}