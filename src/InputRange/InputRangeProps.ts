import * as PropTypes from "prop-types";

export interface InputRangeProps {
    max: number,
    min?: number,
    children: JSX.Element
}

export const InputRangePropTypes: {[P in keyof InputRangeProps]: PropTypes.Validator<any>} = {
    max: PropTypes.number.isRequired,
    min: PropTypes.number,
    children: PropTypes.element.isRequired
};
