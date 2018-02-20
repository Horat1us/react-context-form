import * as React from "react";
import * as PropTypes from "prop-types";

export interface ShowPasswordButtonProps extends React.HTMLProps<HTMLButtonElement> {
    hoverToShow?: boolean;
    clickToShow?: boolean;
}

export const ShowPasswordButtonPropTypes: {[P in keyof ShowPasswordButtonProps]: PropTypes.Validator<any>} = {
    hoverToShow: PropTypes.bool,
    clickToShow: PropTypes.bool
};

export const ShowPasswordButtonDefaultProps: {[P in keyof ShowPasswordButtonProps]?: ShowPasswordButtonProps[P]} = {
    clickToShow: true,
    type: "button"
};
