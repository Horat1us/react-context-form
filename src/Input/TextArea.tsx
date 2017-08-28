import * as React from "react";
import {BaseInput} from "./BaseInput";

export class TextArea extends BaseInput<HTMLTextAreaElement> {
    public render() {
        return <textarea {...this.childProps}/>;
    }
}
