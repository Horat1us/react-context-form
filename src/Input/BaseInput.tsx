import * as React from "react";
import * as PropTypes from "prop-types";

import {InputContext, InputContextTypes} from "./InputContext";
import {BaseInputDefaultProps, BaseInputProps} from "./BaseInputProps";
import {TransformTypes} from "./TransformTypes";
import {cursorPositionController} from "../helpers/cursorPositionController";

export class BaseInput<T extends HTMLElement> extends React.Component<BaseInputProps<T>, undefined> {
    public static contextTypes = InputContextTypes;
    public static defaultProps: BaseInputProps<HTMLElement> = BaseInputDefaultProps;

    public context: InputContext;

    protected get childProps(): BaseInputProps<T> {
        const {transform, ...childProps} = this.props;
        return {
            ...childProps,

            id: this.context.id,
            ref: this.context.onMount,

            name: this.context.name,
            value: this.context.value || "", // Must be init value (controlled input)

            onChange: this.handleChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,

            className: this.props.className || "form-control",
        };
    }

    protected handleChange = async (event: any) => {
        this.props.onChange && this.props.onChange(event);
        if (!event.defaultPrevented) {
            let value = event.currentTarget.value;

            switch (this.props.transform) {
                case TransformTypes.capitalize: {
                    cursorPositionController(event.currentTarget, () => {
                        value = value.replace(/[А-Яа-яЄЇІєїіыЫёЁъЪ`'\w]*/g, (subString) => {
                            return subString.charAt(0).toUpperCase() + subString.substr(1).toLowerCase();
                        });
                        // fix double update
                        event.currentTarget.value = value;
                    });
                    break;
                }
                case TransformTypes.upperCase: {
                    value = value.toString().toUpperCase();
                    break;
                }
            }

            await this.context.onChange(value);
        }
    };

    protected handleBlur = async (event: any) => {
        this.props.onBlur && this.props.onBlur(event);
        if (!event.defaultPrevented) {
            await this.context.onBlur();
        }
    };

    protected handleFocus = async (event: any) => {
        this.props.onFocus && this.props.onFocus(event);
        if (!event.defaultPrevented) {
            await this.context.onFocus();
        }
    };
}
