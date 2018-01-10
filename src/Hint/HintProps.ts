import * as React from "react";

export const HintDefaultProps: {[P in keyof React.HTMLProps<HTMLDivElement>]?: React.HTMLProps<HTMLDivElement>[P]} = {
    className: "form-group-hint",
};
