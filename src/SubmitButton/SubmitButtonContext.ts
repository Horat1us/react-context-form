import * as  PropTypes from "prop-types";

export interface SubmitButtonContext {
    isLoading: boolean;
}

export const SubmitButtonContextTypes = {
    isLoading: PropTypes.bool,
};
