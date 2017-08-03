import * as React from 'react';
import {FormEvent, FormEventHandler} from "react";

export interface AddErrorFunc {
    (attribute: string, error: string): void
}

export interface SendFormFunc extends FormEventHandler<HTMLFormElement> {
    (event: FormEvent<HTMLFormElement>, data: object, addError: AddErrorFunc): void
}

export interface FormProps extends React.HTMLProps<HTMLFormElement> {
    onSubmit: SendFormFunc,
    children: any,
}

interface FormState {
    errors?: string[],
    data: object,
}

export class Form extends React.Component<FormProps, FormState> {
    state: FormState = {
        data: {},
    };

    addError: AddErrorFunc = (attribute: string, error: string) => {
    };

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        return this.props.onSubmit(event, this.state.data, this.addError);
    };

    render() {
        return <form {...this.props} onSubmit={this.handleSubmit}>
            <this.props.children/>
        </form>
    }
}