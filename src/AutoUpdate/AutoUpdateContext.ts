import * as PropTypes from "prop-types";

export interface AutoUpdateContext {
    onBlur: () => void,
}

export const AutoUpdateContextTypes: {[P in keyof AutoUpdateContext]: PropTypes.Validator<any>} = {
    onBlur: PropTypes.func.isRequired,
};
