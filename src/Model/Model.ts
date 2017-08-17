import {validate, ValidationError, ValidationOptions} from "class-validator";
import {ModelError} from "./ModelError";
import {ModelInterface} from "./ModelInterface";
import {ModelValue} from "./ModelValue";

export abstract class Model implements ModelInterface {
    protected errors: ModelError[] = [];

    // We can setup models without initial
    // tslint:disable-next-line:no-empty
    public get(): void {}

    public async validate(group?: string, options: ValidationOptions = {}): Promise<ModelError[]> {
        return this.errors = (await validate(
            this as any,
            {
                skipMissingProperties: true,
                ...options,
                ...(group ? {
                        groups: [group],
                    } : {}
                )
            }
        ))
            .map((error: ValidationError): ModelError => {
                return {
                    attribute: error.property,
                    details: Object.keys(error.constraints)
                        .map((key: string) => error.constraints[key])
                        .join(", "),
                };
            });
    }

    public get values(): ModelValue[] {
        return Object.keys(this)
            .filter((key) => key !== "errors")
            .map(this.getValue.bind(this));
    }

    public getError(attribute: string): ModelError | undefined {

        return this.errors.find((error: ModelError) => error.attribute === attribute);
    }

    public getValue(attribute: string): ModelValue | undefined {
        if ("undefined" === typeof this[attribute]) {
            return undefined;
        }

        const value: ModelValue = {
            attribute,
            model: this,
            value: this[attribute],
        };
        const error = this.getError(attribute);
        if (error) {
            value.error = error.details;
        }

        return value;
    }
}
