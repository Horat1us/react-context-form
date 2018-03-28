import { FormContext } from "../Form";
import { ModelError } from "../Model";

export function addError(context: FormContext, error: any): void {
    if (!(error.response && error.response.status === 400)) {
        throw error;
    }

    error.response.data.errors.forEach(context.addError);
    const modelElement: ModelError = error.response.data.errors
        .reduce((carry: ModelError, existError: ModelError) => carry || existError);

    const element = modelElement && context.getDOMElement(modelElement.attribute);

    (element instanceof HTMLElement) && element.focus();
}
