# <FormGroup \/> Component
This component is wrapper for input/textarea/select and hint/label.  
It requires [context](../src/Form/FormContext.ts) which is provided by [<Form \/>](./Form.md)  

### Usage

```tsx
<Form {...FormProps}>
    <FormGroup
        name="phone"
        errorClassName="has-error"
        focusClassName="has-focus"
        valueClassName="has-value"
        idPrefix="custom-phone-input"
        {...HTMLDivElementProps}
    >
        // ...
    </FormGroup>
</Form>
```

where:
- `name` - field model name (will be passed to input). Required.
- `idPrefix` - id prefix for input and label. Optional.
- `errorClassName` - className, that attaching to `FormGroup` when input does not passed validation. Optional. Default - `has-error`.
- `focusClassName` - className, that attaching to `FormGroup` when input emit `focus` event. Optional. Default - `has-focus`.
- `valueClassName` - className, that attaching to `FormGroup` when input has value. Optional. Default - `has-value`.
