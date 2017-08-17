import * as PropTypes from "prop-types";
import {ModelValue} from "../Model/ModelValue";

export interface FormContext {
    handleChange: (attribute: string, value: any) => any;
    values: ModelValue[];
}

export const FormContextTypes = {
    handleChange: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.object).isRequired,
};
