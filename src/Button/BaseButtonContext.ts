import * as PropTypes from "prop-types";
import {InputContext, InputContextTypes} from "../Input";
import {ModelError} from "../Model";

export interface BaseButtonContext extends InputContext {
    validate: (group: string) => Promise<ModelError[]>
}

export const BaseButtonContextTypes = {
    ...InputContextTypes,
    validate: PropTypes.func.isRequired
};
