# <AutoFocus /> Component
This component is responsible for focusing specific input. Is a wrapper for [<AutoValidate />](./AutoValidate.md).
It requires [context](../src/FormGroup/FormGroupContext.ts) which is provided by [<FormGroup />](./FormGroup.md).

### Usage

```tsx
<Form {...FormProps}>
    <FormGroup name="phone" {...FormGroupProps}>
        <AutoFocus to="email" {...AutoValidateProps}>
            // ...
        </AutoValidate>
    </FormGroup>
    <FormGroup name="email" {...FormGroupProps}>
        // ...
    </FormGroup>
</Form>
```

where:
- `to` - name of input, that must be focused. Required.
