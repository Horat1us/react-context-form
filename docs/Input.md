# <Input \/> Component
This component is represents input for [<Form \/>](./Form.md).
It requires [context](../src/FormGroup/FormGroupContext.ts) which is provided by [<FormGroup \/>](./FormGroup.md).

### Usage

```tsx
<Form {...FormProps}>
    <FormGroup {...FormGroupProps}>
        <Input 
            transform={TransformTypes.capitalize} 
            {...HTMLInputElementProps}
        />
    </FormGroup>
</Form>
```

where:
- `transform` - transform input value with specific preset. Optional. Can take on values: `TransformTypes.capitalize`, `TransformTypes.upperCase`, `TransformTypes.none`.
