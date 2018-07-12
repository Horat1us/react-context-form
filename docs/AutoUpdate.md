# <AutoUpdate \/> Component
This component is responsible for paste specific value to specific input.
It requires [context](../src/FormGroup/FormGroupContext.ts) which is provided by [<FormGroup \/>](./FormGroup.md).

### Usage

```tsx
<Form {...FormProps}>
    <FormGroup name="name" {...FormGroupProps}>
        <AutoUpdate
            onBlur={true}
            onChange={false}
            attribute="email"
            value={(value) => value === "John" ? "john@email.com" : "notJohn@email.com"}
        >
            // ...
        </AutoUpdate>
    </FormGroup>
    <FormGroup name="email" {...FormGroupProps}>
        // ...
    </FormGroup>
</Form>
```

where:
- `attribute` - name of input, in which must pasted value. Required.
- `value` - function, that transform value. Required.
- `onBlur` - update value, when input emit `blur` event. Optional. Default - `true`.
- `onChange` - update value, when input emit `change` event. Optional. Default - `false`.
