import * as PropTypes from "prop-types";
import {ModelError} from "../Model/ModelError";
import {LabelContext, LabelContextTypes} from "../Label/LabelContext";

export interface FormGroupContext extends LabelContext {
    id: string;
    name: string;
    value: any;

    onChange: (value: any) => void;
    onFocus: () => void;
    onBlur: () => void;

    error: string | undefined;
}

export const FormGroupContextTypes = {
    ...LabelContextTypes,

    name: PropTypes.string.isRequired,
    value: PropTypes.any,

    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,

    error: PropTypes.string,
};
