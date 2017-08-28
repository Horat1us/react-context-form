import * as React from "react";

import {Model} from "../Model/Model";
import {FormContext, FormContextTypes} from "./FormContext";
import {FormProps, FormPropTypes} from "./FormProps";
import {FormState} from "./FormState";

export class Form<M extends Model> extends React.Component<FormProps<M> & React.HTMLProps<HTMLFormElement>, FormState<M>> {
    public static propTypes = FormPropTypes;
    public static childContextTypes = FormContextTypes;

    constructor(props: FormProps<M>) {
        super(props);

        this.state = {
            model: this.props.instantiate(),
            mounted: {},
        };
    }

    public getChildContext(): FormContext {
        return {
            onChange: this.handleChange,
            values: this.state.model.values,

            onMount: this.handleMount,
            onUnmount: this.handleUnmount,
        };
    }

    public componentWillMount() {
        this.state.model.get();
    }

    public handleSubmit = async (event?: Event) => {
        event && event.preventDefault();
    };

    public render(): JSX.Element {
        const {instantiate, ...childProps} = this.props;

        return (
            <form onSubmit={this.handleSubmit as any} {...childProps}>
                {this.props.children}
            </form>
        );
    }

    protected handleChange = (attribute: string, value: any) => {
        if (this.state.model[attribute] === value) {
            return;
        }
        this.state.model[attribute] = value;
        this.forceUpdate();
    };

    protected handleMount = (attribute: string, element: HTMLElement) => {
        if (this.state.mounted[attribute] === element) {
            return;
        }
        this.state.mounted[attribute] = element;
        this.forceUpdate();
    };

    protected handleUnmount = (attribute: string) => {
        if (this.state.mounted[attribute] === undefined) {
            return;
        }
        delete this.state.mounted[attribute];
        this.forceUpdate();
    };
}
