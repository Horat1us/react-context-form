import * as React from "react";
import * as PropTypes from "prop-types";

import {Model, ModelError} from "../Model";
import {FormContext, FormContextTypes} from "./FormContext";
import {FormProps, FormPropTypes} from "./FormProps";

export interface FormState<M> {
    model: M,
    mounted: {
        [key: string]: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    },
    isLoading: boolean,
}

export class Form<M extends Model>
    extends React.Component<FormProps<M> & React.HTMLProps<HTMLFormElement>, FormState<M>> {

    public static propTypes = FormPropTypes;
    public static childContextTypes = FormContextTypes;

    public state: FormState<M>;

    constructor(props: FormProps<M>) {
        super(props);

        this.state = {
            model: this.props.instantiate(),
            mounted: {},
            isLoading: false,
        };
    }

    public getChildContext(): FormContext {
        return {
            onChange: this.handleChange,
            values: this.state.model.values,

            onMount: this.handleMount,
            onUnmount: this.handleUnmount,

            validate: this.validate,
            getDOMElement: this.getDOMElement,

            isLoading: this.state.isLoading,
        };
    }

    public async componentWillMount() {
        await this.state.model.get();
    }

    public handleSubmit = async (event?: Event) => {
        event && event.preventDefault();

        await this.setState({isLoading: true});

        await this.state.model.validate();

        if (!this.state.model.hasErrors()) {
            const action = this.state.model[this.props.method];
            if ("function" === typeof action) {
                await action();
            }
        }

        this.state.isLoading = false;
        this.forceUpdate();
    };

    public render(): JSX.Element {
        const {instantiate, ...childProps} = this.props;

        return (
            <form onSubmit={this.handleSubmit as any} {...childProps}>
                {this.props.children}
            </form>
        );
    }

    public getDOMElement = (attribute: string): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement => {
        return this.state.mounted[attribute];
    };

    protected handleChange = (attribute: string, value: any) => {
        if (this.state.model[attribute] === value) {
            return;
        }
        this.state.model[attribute] = value;
        this.forceUpdate();
    };

    protected handleMount =
        (attribute: string, element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
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

    protected validate = async (group: string): Promise<ModelError[]> => {
        const errorsRemoved = (this.state.model.groups()[group] || [])
            .map((attribute: string) => this.state.model.removeErrors(attribute))
            .reduce((carry: number, attributeErrorsCount: number) => carry + attributeErrorsCount, 0);

        const errors = await this.state.model.validate(group);
        if (errors.length > 0 || errorsRemoved > 0) {
            this.forceUpdate();
        }

        return errors;
    };
}
