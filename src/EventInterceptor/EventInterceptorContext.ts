import * as React from "react";

export interface EventInterceptorContextValue {
    onFocus?: (attribute: string, value: any) => void;
    onBlur?: (attribute: string, value: any) => void;
}

export const EventInterceptorContext = React.createContext<EventInterceptorContextValue>({});
