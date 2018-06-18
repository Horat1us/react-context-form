import * as React from "react";
import * as PropTypes from "prop-types";

import { ModelError } from "../Model";
import { OnValidateContextTypes, OnValidateContext } from "./OnValidateContext";

export interface OnValidateProps {
    onValidated: () => void;
}

export const OnValidatePropTypes: {[P in keyof OnValidateProps]: PropTypes.Validator<any>} = {
    onValidated: PropTypes.func.isRequired
};

export interface OnValidateState {
    validateGroups: Map<string, boolean>;
}

export class OnValidate extends React.Component<OnValidateProps, OnValidateState> {
    public static readonly contextTypes = {
        validate: PropTypes.func.isRequired
    };
    public static readonly childContextTypes = OnValidateContextTypes;
    public static readonly propTypes = OnValidatePropTypes;

    public readonly context: {
        readonly validate: (group: string) => Promise<Array<ModelError>>;
    };

    public readonly state: OnValidateState = {
        validateGroups: new Map()
    };

    public getChildContext(): OnValidateContext {
        return {
            registerValidateGroup: this.registerValidateGroup,
            validate: this.validate
        };
    }

    public render(): React.ReactNode {
        return this.props.children;
    }

    protected validate = async (group: string): Promise<Array<ModelError>> => {
        const errors = await this.context.validate(group);
        this.state.validateGroups.set(group, !errors.length);
        this.forceUpdate();

        const isAllValid = !Array.from(this.state.validateGroups.values()).some((validated) => !validated);
        isAllValid && this.props.onValidated();

        return errors;
    }

    protected registerValidateGroup = (group: string): void => {
        this.state.validateGroups.set(group, false);
    }
}
