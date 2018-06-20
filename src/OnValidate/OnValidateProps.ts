import * as PropTypes from "prop-types";

export interface OnValidateProps {
    onValidate: (result: boolean) => void;
    groups: string[];
}

export const OnValidatePropTypes: {[P in keyof OnValidateProps]: PropTypes.Validator<any>} = {
    groups: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onValidate: PropTypes.func.isRequired
};
