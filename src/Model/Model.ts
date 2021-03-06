import { validate, ValidationError, ValidationOptions } from "class-validator";

export interface ModelError {
    attribute: string;
    details: string;
    code?: string | number;
}

export interface ModelGroups {
    [key: string]: string[],
}

export interface ModelInterface {
    readonly values: ModelValue[];

    get: () => void;
    validate: (group?: string) => Promise<ModelError[]>;

    hasErrors: () => boolean;
    getError: (attribute: string) => ModelError | undefined;
    getErrors: () => ModelError[];
    removeErrors: (attribute: string) => number,

    getValue: (attribute: string) => ModelValue | undefined;

    groups: () => { [key: string]: string[] };
}

export interface ModelValue {
    attribute: string;
    value: any;
    model: Model;
    error?: string;
}

export abstract class Model implements ModelInterface {
    public defaults: { [i: string]: any } = {};

    protected errors: ModelError[] = [];

    public constructor(defaults?: Model["defaults"]) {
        if (defaults) {
            this.defaults = { ...this.defaults as any, ...defaults };
        }
        this.reset();
    }

    // We can setup models without initial
    public get = async (): Promise<void> => undefined;

    public async validate(group?: string, options: ValidationOptions = {}): Promise<ModelError[]> {
        const newErrors = (await validate(
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

        const oldErrors = group === undefined
            ? []
            : this.errors.filter(({ attribute }) => !(this.groups()[group] || []).includes(attribute));

        this.errors = [
            ...newErrors,
            ...oldErrors
        ];

        return group === undefined
            ? this.errors
            : newErrors;
    }

    public groups(): { [key: string]: string[] } {
        return {};
    }

    public attributes(): string[] {
        return Object.keys(this)
            .filter((key) => this.hasOwnProperty(key) && key !== "errors" && key !== "get" && key !== "defaults");
    }

    public get values(): ModelValue[] {
        return this.attributes()
            .map(this.getValue.bind(this));
    }

    public getError = (attribute: string): ModelError | undefined => {
        return this.errors.find((error: ModelError) => error.attribute === attribute);
    };

    public getErrors = (): ModelError[] => this.errors;

    public addError = (newError: ModelError) => {
        const oldErrors = this.errors.filter((error: ModelError) => error.attribute !== newError.attribute);

        this.errors = [
            ...oldErrors,
            newError
        ];
    };

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

    public reset(): void {
        this.clear();
        Object.assign(this, this.defaults);
    }

    public clear(): void {
        this.attributes().forEach((key) => this[key] = undefined);
    }
}
