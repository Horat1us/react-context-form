# <Checkbox /> Component
This component is represents checkbox for [<Form />](./Form.md).
It requires [context](../src/FormGroup/FormGroupContext.ts) which is provided by [<FormGroup/>](./FormGroup.md).

### Usage

```tsx
<Form {...FormProps}>
    <FormGroup {...FormGroupProps}>
        <Checkbox
            activeClassName="is-active"
            {...HTMLButtonElementProps}
        />
    </FormGroup>
</Form>
```

where:
- `activeClassName` - className that attaching when checkbox checked. Optional. Default - `is-active`.
