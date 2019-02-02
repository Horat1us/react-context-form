import * as React from "react";

import { ModelError } from "../Model";
import { FormContext, FormContextValue } from "../Form";
import { OnValidateProps } from "./OnValidateProps";

export class OnValidate extends React.PureComponent<OnValidateProps> {
    public static readonly contextType = FormContext;

    public readonly context: FormContextValue;

    public render(): React.ReactNode {
        return <FormContext.Provider value={this.childContextValue} children={this.props.children} />;
    }

    protected get childContextValue(): FormContextValue {
        return {
            ...this.context,
            validate: this.validate,
        };
    }

    protected validate = async (group: string): Promise<ModelError[]> => {
        const errors = await this.context.validate(group);

        if (this.props.groups.find((groupName) => groupName === group)) {
            const isValid = !this.context.values
                .filter(({ attribute }) => this.props.groups.includes(attribute))
                .some(({ value, attribute }) => value === undefined || !!this.context.getError(attribute));

            this.props.onValidate(isValid);
        }

        return errors;
    }
}
