import {validate, ValidationError, ValidationOptions} from "class-validator";
import {ModelError} from "./ModelError";
import {ModelInterface} from "./ModelInterface";
import {ModelValue} from "./ModelValue";

export abstract class Model implements ModelInterface {
    protected errors: ModelError[] = [];

    // We can setup models without initial
    public get = async (): Promise<void> => undefined;

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

    public groups(): { [key: string]: string[] } {
        return {};
    }

    public attributes(): string[] {
        return Object.keys(this)
            .filter((key) => key !== "errors" && key !== "get");
    }

    public get values(): ModelValue[] {
        return this.attributes()
            .map(this.getValue.bind(this));
    }

    public getError(attribute: string): ModelError | undefined {

        return this.errors.find((error: ModelError) => error.attribute === attribute);
    }

    public getValue(attribute: string): ModelValue {
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

    public hasErrors(): boolean {
        return this.errors.length !== 0;
    }

    public removeErrors(attribute: string): number {
        return this.errors.length -
            (this.errors = this.errors.filter((error: ModelError) => error.attribute !== attribute))
                .length;
    }
}
