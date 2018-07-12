# <AutoValidate /> Component
This component is responsible for validating inputs on specified events.
It requires [context](../src/FormGroup/FormGroupContext.ts) which is provided by [<FormGroup/>](./FormGroup.md).

### Usage

```tsx
<Form {...FormProps}>
    <FormGroup name="phone" {...FormGroupProps}>
        <AutoValidate
            groupName="phone"
            onBlur={true}
            onLength={12}
            always={false}
            onChange={false}
            on={(nextValue: string, prevValue: string) => true}
            onValidated={(isValid: boolean) => console.log(isValid)}
        >
                // ...
        </AutoValidate>
    </FormGroup>
</Form>
```

where:
- `groupName` - field model name, that must validated. Required.
- `onBlur` - validate when input emit `blur` event. Optional. Default - `true`.
- `onChange` - validate when input emit `change` event. Optional. Default - `false`.
- `onLength` - validate when input value have specific length. Optional.
- `always` - validate when any event was emitted. Optional. Default - `false`.
- `on` - custom function, that specifies when to validate input. Optional.
- `onValidated` - callback, that triggered when input was validated. Optional.
