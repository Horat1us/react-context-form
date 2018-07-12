# <OnValidate \/> Component
This component is responsible for handling validation result for specific inputs.
It requires [context](../src/Form/FormContext.ts) which is provided by [<Form \/>](./Form.md).

### Usage

```tsx
<Form {...FormProps}>
    <OnValidate 
        groups={["phone", "email"]}
        onValidate={(isAllValid: boolean) => isAllValid ? console.log("Group is valid") : console.log("Group is invalid")}
    >
        <FormGroup name="phone" {...FormGroupProps}>
            // ...
        </FormGroup>
        <FormGroup name="email" {...FormGroupProps}>
            // ...
        </FormGroup>
        <FormGroup name="name" {...FormGroupProps}>
            // ...
        </FormGroup>
    </OnValidate>
     <FormGroup name="middleName" {...FormGroupProps}>
        // ...
    </FormGroup>
</Form>
```

where:
- `groups` - list of inputs name, that are in validation group. Required.
- `onValidate` - callback, that triggered on validation. Required.
