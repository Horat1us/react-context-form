import * as React from "react";
import { BaseInput } from "./BaseInput";
import { PasswordGroupContext, PasswordGroupContextValue } from "../PasswordGroup";

export class PasswordInput extends BaseInput<React.HTMLProps<HTMLInputElement>> {
    public render() {
        return (
            <PasswordGroupContext.Consumer>
                {(context: PasswordGroupContextValue) => <this.input {...context} />}
            </PasswordGroupContext.Consumer>
        );
    }

    protected input = (context: PasswordGroupContextValue) => (
        <input {...this.childProps} type={context.isHidden ? "password" : this.props.type} />
    )
}
