import * as PropTypes from "prop-types";

export interface MultiplePatternInputContext {
    onChange: (event: string) => void
    onFocus: () => void
    onBlur: () => void
}

export const MultiplePatternInputContextTypes = {
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
};
