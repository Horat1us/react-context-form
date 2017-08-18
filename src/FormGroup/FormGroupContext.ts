import * as PropTypes from "prop-types";
import {LabelContext, LabelContextTypes} from "../Label";
import {HintContext, HintContextTypes} from "../Hint";
import {InputContext, InputContextTypes} from "../Input/InputContext";

export interface FormGroupContext extends LabelContext, HintContext, InputContext {}

export const FormGroupContextTypes = {
    ...LabelContextTypes,
    ...HintContextTypes,
    ...InputContextTypes,
};
