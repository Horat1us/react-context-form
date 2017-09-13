import * as React from "react";
import {Hint} from "../Hint";

export class HintPopup extends Hint {

    public render() {
        if (!this.error && !this.props.children) {
            return false;
        }

        return (
            <i {...this.props}>
                <span>
                    {this.error}
                    {!this.error && this.props.children}
                </span>
            </i>
        );
    }
}
