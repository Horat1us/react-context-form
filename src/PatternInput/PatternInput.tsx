import * as React from "react";
import {Input} from "../Input/Input";
import {PatternInputProps, PatternInputPropTypes} from "./PatternInputProps";

export class PatternInput extends React.Component<PatternInputProps> {
    public static propTypes = PatternInputPropTypes;

    public render(): JSX.Element {
        return <Input onChange={this.handleChange}/>;
    }

    protected handleChange = (event: any) => {
        if (!event.target.value.match(this.props.regex)) {
            return;
        }

    };
}
