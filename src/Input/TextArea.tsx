import * as React from "react";
import { BaseInput } from "./BaseInput";

export class TextArea extends BaseInput<React.HTMLProps<HTMLTextAreaElement>> {
    public render(): JSX.Element {
        return <textarea {...this.childProps}/>;
    }
}
