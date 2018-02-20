import * as React from "react";
import * as PropTypes from "prop-types";

import { cursorPositionController } from "../helpers/cursorPositionController";

import { PasswordGroupContextTypes, PasswordGroupContext } from "../PasswordGroup";
import { BaseInputDefaultProps, BaseInputProps, BaseInputPropTypes } from "./BaseInputProps";
import { InputContext, InputContextTypes } from "./InputContext";
import { TransformTypes } from "./TransformTypes";

export class BaseInput<T> extends React.Component<BaseInputProps & T> {
    public static readonly contextTypes = {
        ...InputContextTypes,
        ...PasswordGroupContextTypes
    };    
    public static readonly defaultProps = BaseInputDefaultProps;
    public static readonly propTypes = BaseInputPropTypes;

    public context: InputContext & PasswordGroupContext;

    protected get childProps(): React.HTMLProps<HTMLInputElement> & T {
        const { transform, ...TProps } = this.props as any; // https://github.com/Microsoft/TypeScript/issues/16780

        let passwordInputProps = {};
        if (this.context.isHidden !== undefined && this.context.isHidden) {
           passwordInputProps = {
               type: "password"
           };
        }

        return {
            ...TProps,

            id: this.context.id,
            ref: this.context.onMount,

            name: this.context.name,
            value: this.context.value || "", // Must be init value (controlled input)

            onChange: this.handleChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            ...passwordInputProps
        };
    }

    protected handleChange = (event: any) => {
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

            this.context.onChange(value);
        }
    };

    protected handleBlur = (event: any) => {
        this.props.onBlur && this.props.onBlur(event);
        if (!event.defaultPrevented) {
            this.context.onBlur();
        }
    };

    protected handleFocus = (event: any) => {
        this.props.onFocus && this.props.onFocus(event);
        if (!event.defaultPrevented) {
            this.context.onFocus();
        }
    };
}
