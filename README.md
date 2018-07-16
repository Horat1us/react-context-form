# React Context Form
[![Build Status](https://travis-ci.org/Horat1us/react-context-form.svg?branch=master)](https://travis-ci.org/Horat1us/react-context-form)
[![codecov](https://codecov.io/gh/Horat1us/react-context-form/branch/master/graph/badge.svg)](https://codecov.io/gh/Horat1us/react-context-form)

One more way to write forms on React.  
Developed by [Alexander Letnikow](mailto:reclamme@gmail.com) 
and maintained by [Wearesho](https://wearesho.com/)

## Example
```tsx
<Form instantiate={instantiateAuthorizationModel} method="put">
    <FormGroup name="email" >
        <Input type="email"/>
    </FormGroup>
    <FormGroup name="password" >
        <Input type="password"/>
    </FormGroup>
    <a href="/login">Forgot password?</a>
    <SlowSubmitButton>
        Login
    </SlowSubmitButton>
</Form>
``` 

See more in [demo project](https://github.com/Horat1us/taskbook-frontend)

## Documentation
- [AutoFocus](./docs/AutoFocus.md)
- [AutoUpdate](./docs/AutoUpdate.md)
- [AutoValidate](./docs/AutoValidate.md)
- [Button](./docs/Button.md)
- [Checkbox](./docs/Checkbox.md)
- [EventInterceptor](./docs/EventInterceptor.md)
- [Form](./docs/Form.md)
- [Hint](./docs/Hint.md)
- [HintPopup](./docs/HintPopup.md)
- [InputRange](./docs/InputRange.md)
- [Label](./docs/Label.md)
- [Model](./docs/Model.md)
- [NumericInput](./docs/NumericInput.md)
- [OnValidate](./docs/OnValidate.md)
- [PasswordGroup](./docs/PasswordGroup.md)
- [ResetButton](./docs/ResetButton.md)
- [ShowPasswordButton](./docs/ShowPasswordButton.md)
- [SlowSubmitButton](./docs/SlowSubmitButton.md)
- [SubmitButton](./docs/SubmitButton.md)
- [TextArea](./docs/TextArea.md)

## License
[MIT](./LICENSE)
