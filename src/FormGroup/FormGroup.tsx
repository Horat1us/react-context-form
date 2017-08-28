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
        return {
            id: `${this.props.idPrefix}_${this.id}`,
            name: this.props.name,

            value: this.value ? this.value.value : undefined,

            onChange: this.handleChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,

            error: this.value ? this.value.error : undefined,
        };
    }

    public handleChange = (value: any) => this.context.handleChange(this.props.name, value);

    public handleBlur = () => this.setState({isFocused: false});
    public handleFocus = () => this.setState({isFocused: true});

    get value(): ModelValue | undefined {
        return this.context.values.find((value: ModelValue) => value.attribute === this.props.name);
    }

    get className(): string {
        return [
            this.props.className,
            !!(this.value && this.value.error) ? "has-error" : "",
            this.state.isFocused ? "has-focus" : "",
        ].join(" ");
    }

    public render(): JSX.Element {
        const {name, className, idPrefix, ...childProps} = this.props;

        return (
            <div className={this.className} {...childProps}>
                {this.props.children}
            </div>
        );
    }
}
