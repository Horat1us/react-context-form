import * as React from "react";
import * as ReactDOM from "react-dom";

import {FormEvent} from "react";

import {Form, SendFormFunc, AddErrorFunc} from '../../src/Form/Form';

const handler: SendFormFunc = (event: FormEvent<HTMLFormElement>, data: object, addError: AddErrorFunc): void => {
    console.log(data);
};

ReactDOM.render(
    <div>
        <Form onSubmit={handler}>
            <span>Some text over here</span>
        </Form>
    </div>,
    document.getElementById("content-overlay")
);