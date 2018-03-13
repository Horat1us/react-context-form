import * as PropTypes from "prop-types";

export interface ResetButtonContext {
    onReset: () => void;
}

export const ResetButtonContextTypes: {[P in keyof ResetButtonContext]: PropTypes.Validator<any>} = {
    onReset: PropTypes.func.isRequired
};
