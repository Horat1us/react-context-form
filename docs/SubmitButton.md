# <SubmitButton /> Component
This component is represents button with type `submit` for [<Form />](./Form.md).
It requires [context](../src/Form/FormContext.ts) which is provided by [<Form/>](./Form.md).

### Usage

```tsx
<Form {...FormProps}>
    <SubmitButton  
        {...HTMLButtonElementProps}
        loadingComponent={<span>...</span>}
    />
</Form>
```

where:
- `loadingComponent` - markup, that attaching to button on submit. Required.
