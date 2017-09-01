import * as React from "react";
import {BaseInput} from "./BaseInput";

export class Input extends BaseInput<HTMLInputElement> {

    public render() {
        return <input {...this.childProps}/>;
    }
}
