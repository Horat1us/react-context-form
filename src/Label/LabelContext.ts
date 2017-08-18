import * as PropTypes from "prop-types";

export interface LabelContext {
    id: string,
}

export const LabelContextTypes = {
    id: PropTypes.string.isRequired,
};
