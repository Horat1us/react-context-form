import * as PropTypes from "prop-types";

export interface MultiplePatternInputContext {
    onChange: (event: string) => void
    onFocus: (event: Event) => void
    onBlur: (event: Event) => void
}

export const MultiplePatternInputContextTypes = {
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
};
