# React-FormGroup
[![Build Status](https://travis-ci.org/Horat1us/react-context-form.svg?branch=master)](https://travis-ci.org/Horat1us/react-context-form)
[![codecov](https://codecov.io/gh/Horat1us/react-context-form/branch/master/graph/badge.svg)](https://codecov.io/gh/Horat1us/react-context-form)


One more way to write forms on React  
**[This package is under development]**

Example usage:
```typescript jsx
<Form model={Authorization} method="put">
    <FormGroup
        name="email"
        component={EmailInput}
    />
    <FormGroup
        name="password"
        component={(props) => {
            return <Input type="password" {...props}/>;
        }}
    />
    <a href="/login">Forgot password?</a>
    <SubmitButton>
        Login
    </SubmitButton>
</Form>
```