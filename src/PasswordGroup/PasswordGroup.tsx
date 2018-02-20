import * as React from "react";
import * as PropTypes from "prop-types";

import { PasswordGroupContextTypes, PasswordGroupContext } from "./PasswordGroupContext";

export interface PasswordGroupState {
    isHidden: boolean
}

export class PasswordGroup extends React.Component<React.HTMLProps<HTMLDivElement>, PasswordGroupState> {
    public static readonly childContextTypes = PasswordGroupContextTypes;

    constructor(props) {
        super(props);

        this.state = {
            isHidden: true
        };
    }

    public getChildContext(): PasswordGroupContext {
        return {
            ...this.state,
            onChangeVisibility: this.handleChangeVisibility
        };
    }

    public render(): React.ReactNode {
        return (
            <div {...this.props}>
                {this.props.children}
            </div>
        );
    }

    protected handleChangeVisibility = (state?: boolean) => (): void => {
        if (state === undefined) {
            return this.setState(({ isHidden }) => ({
                isHidden: !isHidden
            }));
        }

        if (this.state.isHidden === state) {
            return;
        }

        this.setState({ isHidden: state });
    }
}
