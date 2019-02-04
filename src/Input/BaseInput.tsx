import * as React from "react";
import { cursorPositionController } from "../helpers";
import { TransformTypes } from "./TransformTypes";
import { FormGroupContext, FormGroupContextValue } from "../FormGroup";

export interface BaseInputProps extends React.HTMLProps<HTMLInputElement> {
    transform?: TransformTypes;
}

export const BaseInputDefaultProps: {[P in keyof BaseInputProps]?: BaseInputProps[P]} = {
    transform: TransformTypes.none,
    className: "form-control"
};

export class BaseInput<T> extends React.PureComponent<BaseInputProps & T> {
    public static readonly contextType = FormGroupContext;
    public static readonly defaultProps = BaseInputDefaultProps;

    public context: FormGroupContextValue;

    protected get childProps(): React.HTMLProps<HTMLInputElement> & T {
        const { transform, ...TProps } = this.props as any; // https://github.com/Microsoft/TypeScript/issues/16780

        return {
            ...TProps,

            id: this.context.id,
            ref: this.context.onMount,

            name: TProps.name || this.context.name,
            value: this.context.value || "", // Must be init value (controlled input)

            onChange: this.handleChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
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
