# <SlowSubmitButton /> Component
This component is represents button with type `submit` for [<Form />](./Form.md) with delay.
It requires [context](../src/Form/FormContext.ts) which is provided by [<Form/>](./Form.md).

### Usage

```tsx
<Form {...FormProps}>
    <SlowSubmitButton  
        {...HTMLButtonElementProps}
        loadingComponent={<span>...</span>}
        duration={500}
    />
</Form>
```

where:
- `loadingComponent` - markup, that attaching to button on submit. Required.
- `duration` - time, that button be in loading state. Optional. Default - `500`.
