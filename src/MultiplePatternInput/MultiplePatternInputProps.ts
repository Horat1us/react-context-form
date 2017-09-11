import * as React from "react";
import * as PropTypes from "prop-types";
import {Pattern} from "./Pattern";

export interface MultiplePatternInputProps extends React.HTMLProps<HTMLElement> {
    patterns: Array<string|Pattern>;
}

export const MultiplePatternInputPropTypes = {
    patterns: PropTypes.oneOfType([
        PropTypes.instanceOf(RegExp),
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.instanceOf(Pattern),
                PropTypes.string,
            ])
        ),
    ]),
};
