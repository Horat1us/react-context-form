import * as React from "react";
import * as PropTypes from "prop-types";

import { InputContextTypes, InputContext } from "../Input";
import { AutoUpdateProps, AutoUpdatePropTypes } from "./AutoUpdateProps";
import { AutoUpdateContext, AutoUpdateContextTypes } from "./AutoUpdateContext";

export class AutoUpdate extends React.Component<AutoUpdateProps> {
    public static propTypes = AutoUpdatePropTypes;
    public static contextTypes = {
        ...InputContextTypes,
        getDOMElement: PropTypes.func.isRequired
    };

    public static readonly childContextTypes = AutoUpdateContextTypes;

    public context: InputContext & {
        getDOMElement: (attribute: string) => HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | undefined,
    };

    public getChildContext(): AutoUpdateContext {
        return {
            onBlur: this.handleBlur,
            onChange: this.handleChange,
        }
    }

    public render(): JSX.Element {
        return this.props.children;
    }

    protected handleUpdate = (): void => {
        this.context.onAttributeChange(this.props.attribute, this.props.value(this.context.value));

        const element = this.context.getDOMElement(this.props.attribute);
        if (element instanceof HTMLElement) {
            // blur event does not triggered if element not focused
            element.focus();
            element.blur();
        }
    }

    protected handleBlur = (): void => {
        this.handleUpdate();

        this.context.onBlur();
    }

    protected handleChange = (value: any): void => {
        if (this.props.onChange) {
            this.context.onAttributeChange(this.props.attribute, this.props.value(value));
        }

        this.context.onChange(value);
    }
}
