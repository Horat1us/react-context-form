import * as React from "React";

import {BaseButton} from "./BaseButton";

export class Button extends BaseButton {

    public render() {
        return <button {...this.childProps}>{this.props.children}</button>
    }
}
