import * as React from "react";
import { TransformTypes } from "./TransformTypes";

export interface BaseInputProps extends React.HTMLProps<HTMLInputElement> {
    transform?: TransformTypes;
}

export const BaseInputDefaultProps: {[P in keyof BaseInputProps]?: BaseInputProps[P]} = {
    transform: TransformTypes.none,
    className: "form-control"
};
