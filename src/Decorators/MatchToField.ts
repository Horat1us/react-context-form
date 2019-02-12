import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function MatchToField(field: string, validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            propertyName,
            target: object.constructor,
            options: validationOptions,
            validator: {
                validate(value: string, args: ValidationArguments): boolean {
                    return value.toString() === args.object[field].toString();
                }
            }
        })
    }
}
