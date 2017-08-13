import PropTypes from 'prop-types';

export const SubmitButtonContextTypes = {
    isLoading: PropTypes.bool.isRequired,
};

export interface SubmitButtonContext {
    isLoading: boolean,
}