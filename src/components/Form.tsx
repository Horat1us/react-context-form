import * as React from 'react';
import {FormEvent, FormEventHandler} from "react";
import ErrorCollection from '../Form/ErrorsCollection';

export interface SendFormFunc extends FormEventHandler<HTMLFormElement> {
    (event: FormEvent<HTMLFormElement>, data: FormData, errors: ErrorCollection): void
}

export interface FormProps extends React.HTMLProps<HTMLFormElement> {
    onSubmit: SendFormFunc,
    children: any,
}

export interface FormData {
    [key: string]: any,
}

interface FormState {
    errors?: ErrorCollection,
    data: FormData,
}

export class Form extends React.Component<FormProps, FormState> {
    state: FormState = {
        data: {},
    };

    constructor(props: FormProps) {
        super();

        this.state.errors = new ErrorCollection(this);
        this.state.data = this.state.data as FormData;
    }

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        return this.props.onSubmit(event, this.state.data, this.state.errors);
    };

    render() {
        return <form {...this.props} onSubmit={this.handleSubmit}>
            {this.props.children}
        </form>
    }
}