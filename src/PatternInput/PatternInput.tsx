import * as React from "react";
import {Input} from "../Input/Input";
import {PatternInputProps, PatternInputPropTypes} from "./PatternInputProps";
import {PatternInputContext, PatternInputContextTypes} from "./PatternInputContext";
import {InputContext, InputContextTypes} from "../Input/InputContext";

export class PatternInput extends React.Component<PatternInputProps> {
    public static propTypes = PatternInputPropTypes;

    public static childContextTypes = PatternInputContextTypes;
    public static contextTypes = InputContextTypes;
    public context: InputContext;

    public getChildContext(): PatternInputContext {
        return {
            onChange: this.handleChange,
        };
    }

    protected get regex(): RegExp {
        let {regex} = this.props;

        if (regex.source[0] !== "^") {
            regex = new RegExp("^" + regex.source);
        }
        if (regex.source[regex.source.length] !== "$") {
            regex = new RegExp(regex.source + "$");
        }

        return regex;
    }

    public render(): JSX.Element {
        const {regex, ...childProps} = this.props;
        return <Input {...childProps as any}/>;
    }

    protected handleChange = (value: string) => {
        if (value && !value.match(this.regex)) {
            return;
        }

        this.context.onChange(value);
    };
}
