import {ModelError} from "./ModelError";
import {ModelValue} from "./ModelValue";

export interface ModelInterface {
    readonly values: ModelValue[];

    get: () => void;
    validate: (group?: string) => Promise<ModelError[]>;

    getError: (attribute: string) => ModelError | undefined;
    getValue: (attribute: string) => ModelValue | undefined;
}