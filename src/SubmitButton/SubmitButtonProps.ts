import * as PropTypes from "prop-types";
import * as React from "react";

export interface SubmitButtonProps extends React.HTMLProps<HTMLButtonElement> {
    loadingComponent: JSX.Element;
}

export const SubmitButtonPropTypes = {
    loadingComponent: PropTypes.element.isRequired,
};

export const SubmitButtonDefaultProps = {
    type: "submit",
};
