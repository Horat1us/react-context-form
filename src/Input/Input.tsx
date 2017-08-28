import * as React from "react";
import {FormGroupContext, FormGroupContextTypes} from "../FormGroup/FormGroupContext";
import {InputContext, InputContextTypes} from "./InputContext";
import {BaseInput} from "./BaseInput";

export class Input extends BaseInput<HTMLInputElement> {

    public render() {
        return <input {...this.childProps}/>;
    }
}
