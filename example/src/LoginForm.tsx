import * as React from 'react';
import {Form, SendFormFunc, FormData} from "../../src/components/Form";
import ErrorsCollection from "../../src/Form/ErrorsCollection";
import FormGroup from "../../src/components/FormGroup";

export default class LoginForm extends React.Component<undefined, undefined> {
    handleSubmit = (event: React.FormEvent<HTMLFormElement>, data: FormData, errors: ErrorsCollection): void => {
        console.log(data);
    };

    render() {
        return <Form onSubmit={this.handleSubmit as SendFormFunc}>
            <FormGroup>
                <input type="email" className="form-control"/>
            </FormGroup>
            <span>Some text over here</span>
            <div>
                <button type="submit" className="btn btn-success">Send me</button>
            </div>
        </Form>
    }
};