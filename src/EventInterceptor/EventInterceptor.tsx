import * as React from "react";
import * as PropTypes from "prop-types";

import { FormContextTypes, FormContext } from "../Form";

export enum Event {
    onChange = "onChange",
    onFocus = "onFocus",
    onBlur = "onBlur"
}

export interface EventInterceptorProps {
    onEvent: (attribute: string, value: any) => void;
    event: Event;
}

export const EventInterceptorPropTypes: {[P in keyof EventInterceptorProps]: PropTypes.Validator<any>} = {
    event: PropTypes.oneOf(Object.keys(Event)).isRequired,
    onEvent: PropTypes.func.isRequired
};

export interface EventInterceptorContext {
    [Event.onChange]: (attribute: string, value: any) => void;
    [Event.onFocus]?: (attribute: string, value: any) => void;
    [Event.onBlur]?: (attribute: string, value: any) => void;
}

export const EventInterceptorContextTypes: {[P in keyof EventInterceptorContext]: PropTypes.Validator<any>} = {
    [Event.onChange]: PropTypes.func.isRequired,
    [Event.onFocus]: PropTypes.func,
    [Event.onBlur]: PropTypes.func
}

export class EventInterceptor extends React.Component<EventInterceptorProps> {
    public static readonly childContextTypes = EventInterceptorContextTypes;
    public static readonly propTypes = EventInterceptorPropTypes;
    public static readonly contextTypes = FormContextTypes;

    public readonly context: FormContext;

    public getChildContext(): EventInterceptorContext {
        return {
            onChange: this.props.event === Event.onChange ? this.handleChange : this.context.onChange,
            onFocus: this.props.event === Event.onFocus ? this.handleEvent : undefined,
            onBlur: this.props.event === Event.onBlur ? this.handleEvent : undefined
        };
    }

    public render(): React.ReactNode {
        return this.props.children;
    }

    protected handleChange = (attribute: string, value: any): void => {
        this.context.onChange(attribute, value);
        !this.context.getError(attribute) && this.props.onEvent(attribute, value);
    }

    protected handleEvent = (attribute: string, value: any): void => {
        !this.context.getError(attribute) && this.props.onEvent(attribute, value);
    }

}
