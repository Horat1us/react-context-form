import * as React from "react";

export interface SubmitButtonProps extends React.HTMLProps<HTMLButtonElement> {
    loadingComponent: JSX.Element;
}

export const SubmitButtonDefaultProps: {[P in keyof SubmitButtonProps]?: SubmitButtonProps[P]} = {
    type: "submit",
};
