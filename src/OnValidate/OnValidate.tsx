import * as React from "react";
import * as PropTypes from "prop-types";

import { ModelError } from "../Model";
import { FormContext } from "../Form";
import { OnValidatePropTypes, OnValidateProps } from "./OnValidateProps";

export class OnValidate extends React.Component<OnValidateProps> {
    public static readonly propTypes = OnValidatePropTypes;
    public static readonly contextTypes = {
        validate: PropTypes.func.isRequired,
        getError: PropTypes.func.isRequired
    };
    public static readonly childContextTypes = { validate: PropTypes.func.isRequired };

    public readonly context: Pick<FormContext, "validate" | "getError">;

    public getChildContext(): Pick<FormContext, "validate"> {
        return {
            validate: this.validate
        };
    }

    public render(): React.ReactNode {
        return this.props.children;
    }

    protected validate = async (group: string): Promise<ModelError[]> => {
        const errors = await this.context.validate(group);

        if (this.props.groups.find((groupName) => groupName === group)) {
            this.props.onValidate(this.props.groups.some((groupName) => !!this.context.getError(groupName)));
        }

        return errors;
    }

}
