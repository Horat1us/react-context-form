import * as React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";

import { BaseInput } from "../Input";
import { RadioButton } from "../RadioButton";

export class CheckBox extends RadioButton {
    public render() {
        return <button {...this.childProps} />
    }

    protected get value() {
        return !this.context.value;
    }
}
