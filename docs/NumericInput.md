# <NumericInput /> Component
This component is represents numeric input for [<Form />](./Form.md).
It requires [context](../src/FormGroup/FormGroupContext.ts) which is provided by [<FormGroup/>](./FormGroup.md).

### Usage

```tsx
<Form {...FormProps}>
    <FormGroup {...FormGroupProps}>
        <NumericInput  {...HTMLInputElementProps} />
    </FormGroup>
</Form>
```

*NOTE: This input have type `tel`*
*NOTE: This input can not contains chars besides numbers*
