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
    onBlur?: (attribute: string, value: string) => void;
    onFocus?: (attribute: string, value: string) => void;
    onChange?: (attribute: string, nextValue: string, prevValue: string) => void;
    events: Event[];
}

export const EventInterceptorPropTypes: {[P in keyof EventInterceptorProps]: PropTypes.Validator<any>} = {
    events: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(Event))).isRequired,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
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
            onFocus: this.props.events.includes(Event.onFocus) ? this.props.onFocus : undefined,
            onBlur: this.props.events.includes(Event.onBlur) ? this.props.onBlur : undefined
        };
    }

    public render(): React.ReactNode {
        return this.props.children;
    }

    protected handleChange = (attribute: string, value: any): void => {
        this.props.onChange && this.props.onChange(attribute, value, this.getValue(attribute));
        this.context.onChange(attribute, value);
    }

    protected getValue = (name: string): string => {
        const founded = this.context.values.find((value: ModelValue) => value.attribute === name);

        return founded
            ? String(founded.value || "")
            : "";
    }
}
