import * as React from "react";

import { FormContext, FormContextValue } from "../Form";
import { ModelValue } from "../Model";
import { EventInterceptorContext, EventInterceptorContextValue } from "./EventInterceptorContext";

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

export class EventInterceptor extends React.Component<EventInterceptorProps> {
    public static readonly contextType = FormContext;

    public readonly context: FormContextValue;

    public render(): React.ReactNode {
        return (
            <FormContext.Provider value={this.formContextValue}>
                <EventInterceptorContext.Provider value={this.childContextValue} children={this.props.children} />
            </FormContext.Provider>
        );
    }

    protected get formContextValue(): FormContextValue {
        return {
            ...this.context,
            onChange: this.props.events.includes(Event.onChange) ? this.handleChange : this.context.onChange,
        };
    }

    protected get childContextValue(): EventInterceptorContextValue {
        return {
            onFocus: this.props.events.includes(Event.onFocus) ? this.props.onFocus : undefined,
            onBlur: this.props.events.includes(Event.onBlur) ? this.props.onBlur : undefined
        };
    }

    protected handleChange = (attribute: string, value: any): void => {
        this.props.onChange && this.props.onChange(attribute, value, this.getValue(attribute));
        this.context.onChange(attribute, value);
    };

    protected getValue = (name: string): string => {
        const founded = this.context.values.find((value: ModelValue) => value.attribute === name);

        return founded
            ? String(founded.value || "")
            : "";
    }
}
