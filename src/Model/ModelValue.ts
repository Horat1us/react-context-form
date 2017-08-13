import {Model} from "./Model";

export interface ModelValue {
    attribute: string,
    value: any,
    model: Model,
    error: string | undefined | false,
}