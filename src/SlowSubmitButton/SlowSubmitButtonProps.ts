import * as PropTypes from "prop-types";
import {SubmitButtonProps, SubmitButtonPropTypes, SubmitButtonDefaultProps} from "../SubmitButton";

export interface SlowSubmitButtonProps extends SubmitButtonProps {
    duration?: number,
}

export const SlowSubmitButtonPropTypes = {...SubmitButtonPropTypes,
                                          duration: PropTypes.number};

export const SlowSubmitButtonDefaultProps = {...SubmitButtonDefaultProps,
                                             duration: 500};
