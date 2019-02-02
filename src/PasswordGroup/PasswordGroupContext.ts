import * as React from "react";

export interface PasswordGroupContextValue {
    onChangeVisibility: (state?: boolean) => () => void;
    isHidden: boolean;
}

export const PasswordGroupContext = React.createContext<PasswordGroupContextValue>({
    onChangeVisibility: () => () => undefined,
    isHidden: true,
});
