# <PasswordGroup /> Component
This component is represents wrapper for [<Input />](./Input.md), that must be password.
It requires [context](../src/Form/FormContext.ts) which is provided by [<Form />](./Form.md).

### Usage

```tsx
<Form {...FormProps}>
    <FormGroup {...FormGroupProps}>
        <PasswordGroup {...HTMLDivElementProps}>
            <Input  {...HTMLInputProps} />
        </InputRange>   
    </FormGroup>
</Form>
```
