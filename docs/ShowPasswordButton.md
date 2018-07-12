# <ShowPasswordButton \/> Component
This component is represents control visibility button for password [<Input \/>](./Input.md).
It requires [context](../src/PasswordGroup/PasswordGroupContext.ts) which is provided by [<PasswordGroup \/>](./PasswordGroup.md).

### Usage

```tsx
<Form {...FormProps}>
    <FormGroup {...FormGroupProps}>
        <PasswordGroup {...HTMLDivElementProps}>
            <Input  {...HTMLInputProps} />
            <ShowPasswordButton 
                clickToShow={true}
                hoverToShow={false}
                {...HTMLButtonElementProps}          
            />
        </InputRange>   
    </FormGroup>
</Form>
```

where:
- `clickToShow` - show password on click. Optional. Default - `true`.
- `hoverToShow` - show password on hover. Optional. Default - `false`.
