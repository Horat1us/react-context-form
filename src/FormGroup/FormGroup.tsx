import * as React from 'react';
import * as classNames from 'classnames';
import {FormGroupProps, FormGroupPropTypes} from "./FormGroupProps";
import {FormGroupContext, FormGroupContextTypes} from "./FormGroupContext";
import {FormContext, FormContextTypes} from "../Form/FormContext";
import {ModelValue} from "../Model/ModelValue";
import {FormGroupState} from "./FormGroupState";

export class FormGroup extends React.Component<FormGroupProps, FormGroupState> {
    static propTypes = FormGroupPropTypes;

    static contextTypes = FormContextTypes;
    context: FormContext;

    state: FormGroupState = {
        isFocused: false,
    };

    get value(): ModelValue | undefined {
        return this.context.values.find((value: ModelValue) => value.attribute === this.props.name);
    }

    get className(): string {
        return classNames(
            this.props.className,
            {
                'has-error': !!this.value.error,
                'has-focus': this.state.isFocused,
            }
        );
    }

    get input(): JSX.Element {
        return <this.props.component
            onFocus={() => this.setState({isFocused: true})}
            onBlur={() => this.setState({isFocused: false})}
        />
    };

    render() {
        const {name, component, className, ...childProps} = this.props;

        return <div className={this.className} {...childProps}>
            {this.props.children}
        </div>;
    }
}