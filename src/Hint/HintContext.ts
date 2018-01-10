import * as PropTypes from "prop-types";

export interface HintContext {
    error?: string;
}

export const HintContextTypes: {[P in keyof HintContext]: PropTypes.Validator<any>} = {
    error: PropTypes.string,
};
