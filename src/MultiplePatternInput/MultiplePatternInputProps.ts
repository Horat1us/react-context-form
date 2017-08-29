import * as React from "react";
import * as PropTypes from "prop-types";

export interface MultiplePatternInputProps extends React.HTMLProps<HTMLElement> {
    patterns: Array<string|RegExp>;
}

export const MultiplePatternInputPropTypes = {
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
