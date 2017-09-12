import * as PropTypes from "prop-types";

export interface InputRangeProps {
    max: number,
    min: number
}

export const InputRangePropTypes = {
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired
};
