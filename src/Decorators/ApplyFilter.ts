export function ApplyFilter<T>(filter: (property: any) => T): PropertyDecorator {
    return (target: any, propertyKey: string | symbol): void => {
        let value = target[propertyKey];

        Object.defineProperty(target, propertyKey, {
            get(): T {
                return value;
            },
            set(newValue: T): void {
                value = filter(newValue);
            },
            configurable: true,
        });
    };
}
