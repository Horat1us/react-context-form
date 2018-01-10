import * as  PropTypes from "prop-types";

export interface SubmitButtonContext {
    isLoading: boolean;
}

export const SubmitButtonContextTypes: {[P in keyof SubmitButtonContext]: PropTypes.Validator<any>} = {
    isLoading: PropTypes.bool,
};
