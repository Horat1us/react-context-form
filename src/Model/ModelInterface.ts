import {ModelError} from "./ModelError";
import {ModelValue} from "./ModelValue";

export interface ModelInterface {
    readonly values: ModelValue[];

    get: () => void;
    validate: (group?: string) => Promise<ModelError[]>;

    hasErrors: () => boolean;
    getError: (attribute: string) => ModelError | undefined;
    removeErrors: (attribute: string) => number,

    getValue: (attribute: string) => ModelValue | undefined;

    groups: () => { [key: string]: string[] };
}
