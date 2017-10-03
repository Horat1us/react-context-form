import * as React from "react";

import {BaseInput} from "./BaseInput";

export class NumericInput extends BaseInput<HTMLInputElement> {

    public render() {
        const childProps = {
            ...this.childProps,
            ...{
                onInput: this.handleInputChange,
                onChange: () => undefined,
                type: "number"
            }
        };

        return <input {...childProps} />;
    }

    protected handleInputChange = async (event: any) => {
        this.props.onChange && this.props.onChange(event);
        if (!event.defaultPrevented) {

            const parsedValue = parseInt(event.currentTarget.value, 10);
            const cleanValue = parsedValue >= 0 ? parsedValue : "";

            event.currentTarget.value = "";
            event.currentTarget.value = cleanValue;

            await this.context.onChange(cleanValue);
        }
    };
}
