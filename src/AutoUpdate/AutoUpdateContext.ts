import * as PropTypes from "prop-types";

export interface AutoUpdateContext {
    onBlur: () => void,
    onChange: (value: any) => void,
}

export const AutoUpdateContextTypes: {[P in keyof AutoUpdateContext]: PropTypes.Validator<any>} = {
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};
