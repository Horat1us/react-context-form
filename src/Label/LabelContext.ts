import * as PropTypes from "prop-types";

export interface LabelContext {
    id: string,
}

export const LabelContextTypes: {[P in keyof LabelContext]: PropTypes.Validator<any>} = {
    id: PropTypes.string.isRequired,
};
