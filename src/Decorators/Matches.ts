import { registerDecorator, ValidationOptions } from "class-validator";

export function Matches(pattern: RegExp, validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: string): boolean {
                    return !!value && pattern.test(value.toString());
                }
            }
        })
    }
}
