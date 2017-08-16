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

    public getChildContext(): FormGroupContext {
        return {
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
        return classNames(
            this.props.className,
            {
                "has-error": !!(this.value && this.value.error),
                "has-focus": this.state.isFocused,
            }
        );
    }

    public render(): JSX.Element {
        const {name, className, ...childProps} = this.props;

        return (
            <div className={this.className} {...childProps}>
                {this.props.children}
            </div>
        );
    }
}
