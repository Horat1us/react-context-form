import * as PropTypes from "prop-types";

export interface PatternInputContext {
    onChange: (event: string) => void
}

export const PatternInputContextTypes = {
    onChange: PropTypes.func.isRequired,
};
