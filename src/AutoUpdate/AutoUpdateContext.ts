import * as PropTypes from "prop-types";

export interface AutoUpdateContext {
    onBlur: () => Promise<void>,
}

export const AutoUpdateContextTypes = {
    onBlur: PropTypes.func.isRequired,
};
