import * as PropTypes from "prop-types";

import { ModelError } from "../Model";

export interface OnValidateContext {
    registerValidateGroup?: (group: string) => void;
    validate: (group: string) => Promise<Array<ModelError>>;
}

export const OnValidateContextTypes: {[P in keyof OnValidateContext]: PropTypes.Validator<any>} = {
    registerValidateGroup: PropTypes.func,
    validate: PropTypes.func.isRequired
};
