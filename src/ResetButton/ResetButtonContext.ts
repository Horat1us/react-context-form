import * as React from "react";

export interface ResetButtonContextValue {
    onReset: () => void;
}

export const ResetButtonContext = React.createContext<ResetButtonContextValue>({
    onReset: () => undefined,
});
