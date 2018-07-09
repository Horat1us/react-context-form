import * as React from "react";
import * as PropTypes from "prop-types";

import { FormContextTypes, FormContext } from "../Form";
import { ModelValue } from "../Model";

export enum Event {
    onChange = "onChange",
    onFocus = "onFocus",
    onBlur = "onBlur"
}

export interface EventInterceptorProps {
    onEvent: (event: Event, params: { attribute: string, nextValue: string, prevValue: string }) => void;
    events: Event[];
}

export const EventInterceptorPropTypes: {[P in keyof EventInterceptorProps]: PropTypes.Validator<any>} = {
    events: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(Event))).isRequired,
    onEvent: PropTypes.func.isRequired
};

export interface EventInterceptorContext {
    onChange: (attribute: string, value: any) => void;
    onFocus?: (attribute: string, value: any) => void;
    onBlur?: (attribute: string, value: any) => void;
}

export const EventInterceptorContextTypes: {[P in keyof EventInterceptorContext]: PropTypes.Validator<any>} = {
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
}

export class EventInterceptor extends React.Component<EventInterceptorProps> {
    public static readonly childContextTypes = EventInterceptorContextTypes;
    public static readonly propTypes = EventInterceptorPropTypes;
    public static readonly contextTypes = FormContextTypes;

    public readonly context: FormContext;

    public getChildContext(): EventInterceptorContext {
        return {
            onChange: this.props.events.includes(Event.onChange) ? this.handleChange : this.context.onChange,
            onFocus: this.props.events.includes(Event.onFocus) ? this.handleEvent(Event.onFocus) : undefined,
            onBlur: this.props.events.includes(Event.onBlur) ? this.handleEvent(Event.onBlur) : undefined
        };
    }

    public render(): React.ReactNode {
        return this.props.children;
    }

    protected handleChange = (attribute: string, value: any): void => {
        this.handleEvent(Event.onChange)(attribute, value);
        this.context.onChange(attribute, value);
    }

    protected handleEvent = (event: Event) => (attribute: string, value: any) => {
        this.props.onEvent(event, { attribute, nextValue: String(value), prevValue: this.getValue(attribute) });
    }

    protected getValue = (name: string): string => {
        const founded = this.context.values.find((value: ModelValue) => value.attribute === name);

        return founded
            ? String(founded.value || "")
            : "";
    }
}
