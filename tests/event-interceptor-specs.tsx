import { expect } from "chai";
import * as React from "react";
import { mount, ReactWrapper } from "enzyme";

import { EventInterceptor, FormContext, Form, FormContextTypes, Event } from "../src";
import { ExampleModel } from "./helpers/ExampleModel";

describe("<EventInterceptor/>", () => {
    let wrapper: ReactWrapper<{}>;

    let context: FormContext;
    let model: ExampleModel;

    let eventValue: { event: string; value: string; prevValue?: string } = {
        event: "",
        value: "",
        prevValue: ""
    };
    const handleOnEvent = (event) => (attribute, value, prevValue?: string) => {
        eventValue = {
            event,
            value,
            prevValue
        };
    }

    beforeEach(() => {
        model = new ExampleModel();
        context = new Form({
            instantiate: () => model
        }).getChildContext();

        wrapper = mount(
            <EventInterceptor
                events={[Event.onBlur, Event.onChange, Event.onFocus]}
                onFocus={handleOnEvent(Event.onFocus)}
                onChange={handleOnEvent(Event.onChange)}
                onBlur={handleOnEvent(Event.onBlur)}
            >
                <div />
            </EventInterceptor>,
            { context, childContextTypes: FormContextTypes }
        );
    });

    afterEach(() => {
        eventValue = {
            event: "",
            value: "",
            prevValue: ""
        };

        wrapper.unmount();
    })

    it("Should call according prop event", () => {
        (wrapper.instance() as any).getChildContext().onChange("attribute", "value change");
        expect(eventValue.event).to.equals(Event.onChange);
        expect(eventValue.value).to.equals("value change");

        (wrapper.instance() as any).getChildContext().onBlur("attribute", "value blur");
        expect(eventValue.event).to.equals(Event.onBlur);
        expect(eventValue.value).to.equals("value blur");

        (wrapper.instance() as any).getChildContext().onFocus("attribute", "value focus");
        expect(eventValue.event).to.equals(Event.onFocus);
        expect(eventValue.value).to.equals("value focus");
    });

    it("Should pass prev value onChange", () => {
        model.password = "test";
        context = context = new Form({
            instantiate: () => model
        }).getChildContext();
        wrapper.unmount();
        wrapper = mount(
            <EventInterceptor
                events={[Event.onChange]}
                onChange={handleOnEvent(Event.onChange)}
            >
                <div />
            </EventInterceptor>,
            { context, childContextTypes: FormContextTypes }
        );

        (wrapper.instance() as any).getChildContext().onChange("password", "value change");
        expect(eventValue.value).to.equals("value change");
        expect(eventValue.prevValue).to.equals("test");

        model.password = undefined;
        context = context = new Form({
            instantiate: () => model
        }).getChildContext();
        wrapper.unmount();
        wrapper = mount(
            <EventInterceptor
                events={[Event.onChange]}
                onChange={handleOnEvent(Event.onChange)}
            >
                <div />
            </EventInterceptor>,
            { context, childContextTypes: FormContextTypes }
        );

        (wrapper.instance() as any).getChildContext().onChange("password", "value change");
        expect(eventValue.value).to.equals("value change");
        expect(eventValue.prevValue).to.be.empty;
    });

    it("Should not call event if it not passed to prop", () => {
        wrapper.unmount();
        wrapper = mount(
            <EventInterceptor
                events={[Event.onBlur]}
                onChange={handleOnEvent(Event.onChange)}
            >
                <div />
            </EventInterceptor>,
            { context, childContextTypes: FormContextTypes }
        );

        expect(eventValue.value).to.equals("");
    });

});
