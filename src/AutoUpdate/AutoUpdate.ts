import * as React from "react";
import * as PropTypes from "prop-types";

import { AutoUpdateProps, AutoUpdatePropTypes} from "./AutoUpdateProps";
import {InputContextTypes, InputContext} from "../Input";
import {AutoUpdateContext, AutoUpdateContextTypes} from "./AutoUpdateContext";

export class AutoUpdate extends React.Component<AutoUpdateProps, undefined> {
    public static propTypes = AutoUpdatePropTypes;
    public static contextTypes = InputContextTypes;

    public static readonly childContextTypes = AutoUpdateContextTypes;

    public context: InputContext;

    public getChildContext(): AutoUpdateContext {
        return {
            onBlur: this.handleUpdate
        }
    }

    public render(): JSX.Element {
        return this.props.children;
    }

    protected handleUpdate = async () => {
        await this.context.onAttributeChange(this.props.attribute, this.props.value(this.context.value));

        await this.context.onBlur();
    }
}
