# <Input /> Component
This component is represents input for [<Form />](./Form.md).
It requires [context](../src/Form/FormContext.ts) which is provided by [<Form />](./Form.md).

### Usage

```tsx
<Form {...FormProps}>
    <FormGroup {...FormGroupProps}>
        <Input 
            transform={TransformTypes.capitalize} 
            {...HTMLInputProps}
        />
    </FormGroup>
</Form>
```

where:
- `transform` - transform input value with specific preset. Optional. Can take on values: `TransformTypes.capitalize`, `TransformTypes.upperCase`, `TransformTypes.none`.
