# <TextArea /> Component
This component is represents textarea for [<Form />](./Form.md).
It requires [context](../src/Form/FormContext.ts) which is provided by [<Form />](./Form.md).

### Usage

```tsx
<Form {...FormProps}>
    <FormGroup {...FormGroupProps}>
        <TextArea 
            transform={TransformTypes.capitalize} 
            {...HTMLInputProps}
        />
    </FormGroup>
</Form>
```

where:
- `transform` - transform input value with specific preset. Optional. Can take on values: `TransformTypes.capitalize`, `TransformTypes.upperCase`, `TransformTypes.none`.
