import * as React from "react";

import { PasswordGroupContext, PasswordGroupContextValue } from "./PasswordGroupContext";

export class PasswordGroup extends React.PureComponent<React.HTMLProps<HTMLDivElement>, { isHidden: boolean }> {
    public readonly state = { isHidden: true };

    public render(): React.ReactNode {
        return (
            <PasswordGroupContext.Provider value={this.childContextValue}>
                <div {...this.props}>
                    {this.props.children}
                </div>
            </PasswordGroupContext.Provider>
        );
    }

    protected get childContextValue(): PasswordGroupContextValue {
        return {
            ...this.state,
            onChangeVisibility: this.handleChangeVisibility,
        };
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
