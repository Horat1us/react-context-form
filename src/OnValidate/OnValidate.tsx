import * as React from "react";
import * as PropTypes from "prop-types";

import { ModelError } from "../Model";
import { OnValidateContextTypes, OnValidateContext } from "./OnValidateContext";

export interface OnValidateProps {
    onValid?: () => void;
    onInvalid?: (errors: Array<ModelError>) => void;
}

export const OnValidatePropTypes: {[P in keyof OnValidateProps]: PropTypes.Validator<any>} = {
    onInvalid: PropTypes.func,
    onValid: PropTypes.func
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

        if (!Array.from(this.state.validateGroups.values()).some((validated) => !validated)) {
            this.props.onValid && this.props.onValid();
        } else {
            this.props.onInvalid && this.props.onInvalid(errors);
        }

        return errors;
    }

    protected registerValidateGroup = (group: string): void => {
        this.state.validateGroups.set(group, false);
    }
}
