import * as PropTypes from "prop-types";

export interface AutoValidateContext {
    onChange: (value: any) => void,
    onBlur: () => void,
}

export const AutoValidateContextTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
};
