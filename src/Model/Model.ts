import {validate, ValidationError, ValidationOptions} from "class-validator";
import {ModelValue} from "./ModelValue";
import {ModelError} from "./ModelError";

export abstract class Model {
    protected errors: ModelError[] = [];

    // We can setup models without initial
    public get (): void {
    }

    public async validate(group?: string, options: ValidationOptions = {}): Promise<ModelError[]> {
        return this.errors = (await validate(this, Object.assign({
            skipMissingProperties: true,
        }, options, group ? {
            groups: [group],
        } : {})))
            .map((error: ValidationError): ModelError => {
                return {
                    attribute: error.property,
                    details: Object.keys(error.constraints)
                        .map((key: string) => error.constraints[key])
                        .join(', '),
                }
            })
    }

    public get values(): ModelValue[] {
        return Object.keys(this)
            .filter(key => key !== 'errors')
            .map(this.getValue.bind(this));
    }

    public getError(attribute: string): ModelError | undefined {
        return this.errors.find((error: ModelError) => error.attribute === attribute);
    };

    public getValue(attribute: string): ModelValue | undefined {
        if ('undefined' === typeof this[attribute]) {
            return undefined;
        }

        const value: ModelValue = {
            model: this,
            value: this[attribute],
            attribute: attribute,
        };
        const error = this.getError(attribute);
        if (error) {
            value.error = error.details;
        }

        return value;
    }
}