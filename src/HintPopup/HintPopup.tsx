import * as React from "react";

import { Hint } from "../Hint";

export class HintPopup extends Hint {

    public render(): React.ReactNode {
        if (!this.error && !this.props.children) {
            return null;
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
