# <TextArea \/> Component
This component is represents textarea for [<Form \/>](./Form.md).
It requires [context](../src/FormGroup/FormGroupContext.ts) which is provided by [<FormGroup \/>](./FormGroup.md).

### Usage

```tsx
<Form {...FormProps}>
    <FormGroup {...FormGroupProps}>
        <TextArea 
            transform={TransformTypes.capitalize} 
            {...HTMLTextAreaElementProps}
        />
    </FormGroup>
</Form>
```

where:
- `transform` - transform input value with specific preset. Optional. Can take on values: `TransformTypes.capitalize`, `TransformTypes.upperCase`, `TransformTypes.none`.
