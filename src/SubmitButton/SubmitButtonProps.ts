import * as React from "react";
import * as PropTypes from "prop-types";

export interface SubmitButtonProps extends React.HTMLProps<HTMLButtonElement> {
    loadingComponent: JSX.Element;
}

export const SubmitButtonPropTypes: {[P in keyof SubmitButtonProps]: PropTypes.Validator<any>} = {
    loadingComponent: PropTypes.element.isRequired,
};

export const SubmitButtonDefaultProps: {[P in keyof SubmitButtonProps]?: SubmitButtonProps[P]} = {
    type: "submit",
};
