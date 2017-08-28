import * as classNames from "classnames";
import * as React from "react";
import {FormContext, FormContextTypes} from "../Form/FormContext";
import {ModelValue} from "../Model/ModelValue";
import {FormGroupContext, FormGroupContextTypes} from "./FormGroupContext";
import {FormGroupDefaultProps, FormGroupProps, FormGroupPropTypes} from "./FormGroupProps";
import {FormGroupState} from "./FormGroupState";

export class FormGroup extends React.Component<FormGroupProps, FormGroupState> {
    public static propTypes = FormGroupPropTypes;
    public static defaulProps = FormGroupDefaultProps;

    public static childContextTypes = FormGroupContextTypes;
    public static contextTypes = FormContextTypes;
    public context: FormContext;

    public state: FormGroupState = {
        isFocused: false,
    };

    public id: string;

    constructor(props) {
        super(props);

        this.id = Date.now().toString();
    }

    public getChildContext(): FormGroupContext {
        const value = this.value;
        return {
            id: `${this.props.idPrefix}_${this.id}`,
            name: this.props.name,

            value: value ? value.value : undefined,

            onChange: this.handleChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            onMount: this.handleMount,

            error: value ? value.error : undefined,
        };
    }

    /**
     * @todo: tests
     */
    public componentWillUnmount() {
        this.context.onUnmount(this.props.name);
    }

    public handleChange = (value: any) => this.context.onChange(this.props.name, value);

    public handleBlur = () => this.setState({isFocused: false});
    public handleFocus = () => this.setState({isFocused: true});

    public handleMount = (ref: HTMLElement) => this.context.onMount(this.props.name, ref);

    public get value(): ModelValue | undefined {
        return this.context.values.find((value: ModelValue) => value.attribute === this.props.name);
    }

    public render(): JSX.Element {
        const {name, className, idPrefix, ...childProps} = this.props;

        return (
            <div className={this.className} {...childProps}>
                {this.props.children}
            </div>
        );
    }

    protected get className(): string {
        const value = this.value;
        return classNames(
            this.props.className,
            {
                "has-error": !!(value && value.error),
                "has-focus": this.state.isFocused,
            }
        );
    }
}
