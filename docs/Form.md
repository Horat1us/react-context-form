# <Form /> Component
This component is responsible for handling changing and providing values to [<FormGroup/>](./FormGroup.md)

### Usage

```tsx
<Form 
    storageKey="my-form"
    resetAfterSubmit={true}
    storage={window.localStorage}
    instantiate={() => new ExampleModel()}
    afterSubmit={() => console.log("Submit is completed")}
    onSubmit={async (model: ExampleModel, childContext: FormContext) => /* submit code */}
    onValidate={(groups: Array<{ name: string, isValid: boolean }>) => console.log(groups)}
>
    // ...
</Form>
```

where:
- `storageKey` - unique string to store values in provided storage. Optional. If not passed - values does not be stored.
- `resetAfterSubmit` - resets model to defaults after success submit. Optional.
- `storage` - storage, that contains values. Optional. If not passed - localStorage will be used.
- `instantiate` - function, that return instance of `Model`. Required.
- `afterSubmit` - callback, that triggered after success submit. Optional.
- `onSubmit` - function, that implements submit. Optional. If not passed - `method` prop must be pased.
- `method` - string, that using when `onSubmit` prop does not passed.
- `onValidate` - callback, that triggered when some fields are validated. Optional.

*NOTE: `storage` must implement `getItem` and `setItem` methods*
