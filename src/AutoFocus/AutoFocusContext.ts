import * as PropTypes from "prop-types";

export interface AutoFocusContext {
    getDOMElement: (attribute: string) => HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | undefined,
}

export const AutoFocusContextTypes: {[P in keyof AutoFocusContext]: PropTypes.Validator<any>} = {
    getDOMElement: PropTypes.func.isRequired,
};
