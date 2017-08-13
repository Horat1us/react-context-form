import PropTypes from 'prop-types';
import {ModelValue} from "../Model/ModelValue";

export interface FormContextInterface {
    handleChange: (attribute: string, value: any) => any,
    values: ModelValue[],
}

export default {
    handleChange: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.object).isRequired,
}