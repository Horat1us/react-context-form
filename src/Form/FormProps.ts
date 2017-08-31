import * as React from "react";
import * as PropTypes from "prop-types";
import {ModelInterface} from "../Model";

export interface FormProps<M extends ModelInterface> {
    instantiate: () => M;
    method: string,
}

export const FormPropTypes = {
    instantiate: PropTypes.func.isRequired,
    method: PropTypes.string.isRequired,
};
