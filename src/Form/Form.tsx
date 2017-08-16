import * as React from "react";

import {Model} from "../Model/Model";
import {FormContext, FormContextTypes} from "./FormContext";
import {FormProps} from "./FormProps";

export class Form<M extends Model> extends React.Component<FormProps<M>, M> {
    protected static childContextTypes = FormContextTypes;

    constructor(props: FormProps<M>) {
        super(props);
        this.state = props.instantiate();
    }

    public getChildContext(): FormContext {
        return {
            handleChange: (attribute: string, value: any) => this.setState({[attribute]: value} as any),
            values: this.state.values,
        };
    }

    public componentWillMount() {
        this.state.get();
    }

    public handleSubmit = async (event?: Event) => {
        event && event.preventDefault();
    };

    public render(): JSX.Element {
        return (
            <form onSubmit={this.handleSubmit as any}>
                {this.props.children}
            </form>
        );
    }
}
