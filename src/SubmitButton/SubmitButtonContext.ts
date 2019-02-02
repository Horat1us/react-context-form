import * as React from "react";

export interface SubmitButtonContextValue {
    isLoading: boolean;
}

export const SubmitButtonContext = React.createContext<SubmitButtonContextValue>({
    isLoading: false,
});
