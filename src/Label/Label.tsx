import * as React from "react";
import * as PropTypes from "prop-types";

import {LabelContext, LabelContextTypes} from "./LabelContext";

export class Label extends React.Component<React.HTMLProps<HTMLLabelElement>> {
    public static contextTypes = LabelContextTypes;
    public context: LabelContext;

    public render() {
        const childProps = {
            ...this.props,
            htmlFor: this.context.id,
        };

        return (
            <label {...childProps}/>
        );
    }
}
