# <Button /> Component
This component is represents button for [<Form />](./Form.md).
It requires [context](../src/FormGroup/FormGroupContext.ts) which is provided by [<FormGroup/>](./FormGroup.md).

### Usage

```tsx
<Form {...FormProps}>
    <FormGroup {...FormGroupProps}>
        <Button
            action="button clicked"
            activeClassName="is-active"
            {...HTMLButtonElementProps}
        />
    </FormGroup>
</Form>
```

where:
- `action` - value, that passed to model. Requried.
- `activeClassName` - className that attaching when `action` prop value is the same as value in model. Optional. Default - `is-active`.
