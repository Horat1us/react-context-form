import * as React from "react";
import * as PropTypes from "prop-types";

export interface PatternInputProps extends React.HTMLProps<HTMLElement> {
    patterns: Array<string|RegExp>;
}

export const PatternInputPropTypes = {
    patterns: PropTypes.oneOfType([
        PropTypes.instanceOf(RegExp),
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.instanceOf(RegExp),
                PropTypes.string,
            ])
        ),
    ]),
};
