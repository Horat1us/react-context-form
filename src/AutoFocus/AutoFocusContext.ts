import * as PropTypes from "prop-types";

export interface AutoFocusContext {
    getDOMElement: (attribute: string) => HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | undefined,
}

export const AutoFocusContextTypes = {
    getDOMElement: PropTypes.func.isRequired,
};
