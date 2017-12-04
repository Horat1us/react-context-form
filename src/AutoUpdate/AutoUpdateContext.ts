import * as PropTypes from "prop-types";

export interface AutoUpdateContext {
    onBlur: () => void,
}

export const AutoUpdateContextTypes = {
    onBlur: PropTypes.func.isRequired,
};
