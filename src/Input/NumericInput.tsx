import * as React from "react";

import { BaseInput } from "./BaseInput";

export class NumericInput extends BaseInput<React.HTMLProps<HTMLInputElement>> {

    public render(): JSX.Element {
        const childProps = {
            ...this.childProps,
            ...{
                onInput: this.handleInputChange,
                onChange: () => undefined,
                type: "tel"
            }
        };

        return <input {...childProps} />;
    }

    protected handleInputChange = (event: any): void => {
        this.props.onChange && this.props.onChange(event);
        if (!event.defaultPrevented) {
            const parsedValue = event.currentTarget.value.replace(/\D/g, "");
            event.currentTarget.value = parsedValue;

            this.context.onChange(parsedValue);
        }
    };
}
