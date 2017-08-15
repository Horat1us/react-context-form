import * as PropTypes from 'prop-types';
import {ModelError} from "../Model/ModelError";

export interface FormGroupContext {
    name: string,
    value: any,

    onChange: any,
    error: string | undefined,
}

export const FormGroupContextTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,

    onChange: PropTypes.func.isRequired,
    error: PropTypes.object,
};