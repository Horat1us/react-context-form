import * as React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";

import { BaseInput } from "../Input";

export type RadioButtonValue = string | number | string[] | boolean;

export class RadioButton extends BaseInput<HTMLButtonElement, RadioButtonValue> {
    public render() {
        return <button {...this.childProps} />
    }

    protected get childProps(): React.HTMLProps<HTMLButtonElement> {
        const childProps = super.childProps;

        childProps.onClick = this.handleClick;
        childProps.className = classNames(childProps.className, "active");
        delete childProps.onChange;

        return childProps;
    }

    protected get value(): RadioButtonValue {
        return this.props.value;
    }

    protected get isActive(): boolean {
        return this.context.value === this.value;
    }

    protected handleClick = () => {
        this.context.onChange(this.value);
    }
}
