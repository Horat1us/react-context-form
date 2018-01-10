import * as PropTypes from "prop-types"

import { HintContext, HintContextTypes } from "../Hint";
import { LabelContext, LabelContextTypes } from "../Label";
import { InputContext, InputContextTypes } from "../Input/InputContext";

export interface FormGroupContext extends LabelContext, HintContext, InputContext { }

export const FormGroupContextTypes: {[P in keyof FormGroupContext]: PropTypes.Validator<any>} = {
    ...LabelContextTypes,
    ...HintContextTypes,
    ...InputContextTypes,
};
