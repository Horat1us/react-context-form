import * as PropTypes from "prop-types";
import {FormGroupDefaultProps, FormGroupPropTypes} from "../FormGroup/FormGroupProps";

export interface RadioGroupProps extends HTMLElement {
    yesLabel: string,
    noLabel: string
}

export const RadioGroupPropTypes = {
    yesLabel: PropTypes.string.isRequired,
    noLabel: PropTypes.string.isRequired
};
