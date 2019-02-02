// tslint:disable-next-line
import { AxiosError } from "axios";

import { FormContext, FormContextValue } from "../Form";
import { ModelError } from "../Model";

export function addError(context: FormContextValue, error: AxiosError): void {
    if (
        !error.response
        || error.response.status !== 400
        || !error.response.data
        || !(error.response.data.errors instanceof Array)
    ) {
        throw error;
    }

    const validErrors: ModelError[] = error.response.data.errors
        .filter((validError: ModelError) => validError.details && validError.attribute);

    if (!validErrors.length) {
        throw error;
    }

    validErrors.forEach(context.addError);

    const modelElement: ModelError = validErrors
        .reduce((carry: ModelError, existError: ModelError) => carry || existError);

    const element = modelElement && context.getDOMElement(modelElement.attribute);

    (element instanceof HTMLElement) && element.focus();
}
