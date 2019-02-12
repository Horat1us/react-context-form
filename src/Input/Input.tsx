import * as React from "react";

import { BaseInput } from "./BaseInput";

export class Input extends BaseInput<React.HTMLProps<HTMLInputElement>> {

    public render() {
        return <input {...this.childProps} />;
    }
}
