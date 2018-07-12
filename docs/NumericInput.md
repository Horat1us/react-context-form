# <NumericInput /> Component
This component is represents numeric input for [<Form />](./Form.md).
It requires [context](../src/Form/FormContext.ts) which is provided by [<Form />](./Form.md).

### Usage

```tsx
<Form {...FormProps}>
    <FormGroup {...FormGroupProps}>
        <NumericInput  {...HTMLInputProps} />
    </FormGroup>
</Form>
```

*NOTE: This input have type `tel`*
*NOTE: This input can not contains chars besides numbers*
