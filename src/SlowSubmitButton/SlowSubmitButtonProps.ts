import * as PropTypes from "prop-types";

import { SubmitButtonProps, SubmitButtonPropTypes, SubmitButtonDefaultProps } from "../SubmitButton";

export interface SlowSubmitButtonProps extends SubmitButtonProps {
    duration?: number,
}

export const SlowSubmitButtonPropTypes: {[P in keyof SlowSubmitButtonProps]: PropTypes.Validator<any>} = {
    ...SubmitButtonPropTypes,
    duration: PropTypes.number
};

export const SlowSubmitButtonDefaultProps: {[P in keyof SlowSubmitButtonProps]?: SlowSubmitButtonProps[P]} = {
    ...SubmitButtonDefaultProps,
    duration: 500
};
