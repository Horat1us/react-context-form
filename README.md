# React-FormGroup
[![Build Status](https://travis-ci.org/Horat1us/react-context-form.svg?branch=master)](https://travis-ci.org/Horat1us/react-context-form)
[![codecov](https://codecov.io/gh/Horat1us/react-context-form/branch/master/graph/badge.svg)](https://codecov.io/gh/Horat1us/react-context-form)


One more way to write forms on React.

## Example
```typescript jsx
<Form instantiate={instantiateAuthorizationModel} method="put">
    <FormGroup
        name="email"
    >
        <Input type="email"/>
    </FormGroup>
    <FormGroup
        name="password"
    >
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
- [Form](./docs/Form.md)
- [FormGroup](./docs/FormGroup.md)
- [Model](./docs/Model.md)