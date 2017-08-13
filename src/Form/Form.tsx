import * as React from 'react';

import {FormProps} from "./FormProps"
import {Model} from "../Model/Model";
import FormContext, {FormContextInterface} from "./FormContext";

export class Form<M extends Model> extends React.Component<FormProps<M>, M> {
    protected static childContextTypes = FormContext;

    constructor(props: FormProps<M>) {
        super(props);
        this.state = props.instantiate();
    }

    getChildContext(): FormContextInterface {
        return {
            handleChange: (attribute: string, value: any) => this.setState({[attribute]: value} as any),
            values: this.state.values
        };
    }

    componentWillMount() {
        this.state.get();
    }

    handleSubmit = async (event?: Event) => {
        event && event.preventDefault();
    };

    render(): JSX.Element {
        return <form onSubmit={this.handleSubmit as any}>
            {this.props.children}
        </form>;
    }
}