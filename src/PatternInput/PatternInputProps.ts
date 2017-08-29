import * as React from "react";
import * as PropTypes from "prop-types";

export interface PatternInputProps extends React.HTMLProps<HTMLElement> {
    regex: RegExp;
}

export const PatternInputPropTypes = {
    regex: PropTypes.instanceOf(RegExp),
};
