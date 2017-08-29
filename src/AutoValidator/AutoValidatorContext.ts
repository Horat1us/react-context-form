import * as PropTypes from "prop-types";

export interface AutoValidatorContext {
    onChange: (value: any) => void,
    onBlur: () => void,
}

export const AutoValidatorContextTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
};
