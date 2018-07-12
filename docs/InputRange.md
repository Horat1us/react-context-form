# <NumericRange \/> Component
This component is represents range for [<NumericInput \/>](./NumericInput.md).
It requires [context](../src/FormGroup/FormGroupContext.ts) which is provided by [<FormGroup \/>](./FormGroup.md).

### Usage

```tsx
<Form {...FormProps}>
    <FormGroup {...FormGroupProps}>
        <InputRange
            max={900}
            min={1}
        >
            <NumericInput  {...HTMLInputProps} />
        </InputRange>   
    </FormGroup>
</Form>
```

where:
- `max` - max value for input. Required.
- `min` - min value for input. Optional.
