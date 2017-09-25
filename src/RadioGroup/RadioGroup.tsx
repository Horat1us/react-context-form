import * as React from "react";
import * as PropTypes from "prop-types";

import {Label} from "../Label";
import {Button} from "../Button";
import {FormGroupContextTypes, FormGroupContext} from "../FormGroup";

import {RadioGroupProps} from "./RadioGroupProps";

export class RadioGroup extends React.Component<RadioGroupProps, undefined> {
    public static contextTypes = FormGroupContextTypes;
    public readonly activeClassName = "active";

    public context: FormGroupContext;

    public render() {
        return (
            <div className="radio-group">
                <Label>{this.props.yesLabel}</Label>
                <Button
                    className={this.getButtonClassName(true)}
                    onClick={this.handleSelectYes}
                    data-action="yes"
                />
                <Label>{this.props.noLabel}</Label>
                <Button
                    className={this.getButtonClassName(false)}
                    onClick={this.handleSelectNo}
                    data-action="no"
                />
            </div>
        )
    }

    protected getButtonClassName(type) {
        const className = this.props.className || "btn-radio";
        const additionalClassName = !!this.context.value === type ? ` ${this.activeClassName}` : "";
        return `${className}${additionalClassName}`
    }

    protected handleSelectYes = async () => await this.context.onChange(true);

    protected handleSelectNo = async () => await this.context.onChange(false);
}
