import * as PropTypes from "prop-types";

export interface HintContext {
    error?: string;
}

export const HintContextTypes = {
    error: PropTypes.string,
};
