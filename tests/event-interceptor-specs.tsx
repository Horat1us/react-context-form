import { expect } from "chai";
import * as React from "react";
import { mount, ReactWrapper } from "enzyme";

import { EventInterceptor, FormContext, Form, FormContextTypes, Event } from "../src";
import { ExampleModel } from "./helpers/ExampleModel";

describe("<Hint/>", () => {
    let wrapper: ReactWrapper<{}>;

    const model = new ExampleModel();
    const context: FormContext = new Form({
        instantiate: () => model
    }).getChildContext();

    let eventValue = {
        event: "",
        params: {
            prevValue: "",
            nextValue: ""
        }
    };
    const handleOnEvent = (event, params) => {
        eventValue = {
            event,
            params
        };
    }

    beforeEach(() => {
        wrapper = mount(
            <EventInterceptor events={[Event.onBlur]} onEvent={handleOnEvent}>
                <div />
            </EventInterceptor>,
            { context, childContextTypes: FormContextTypes }
        );
    });

    afterEach(() => {
        eventValue = {
            event: "",
            params: {
                prevValue: "",
                nextValue: ""
            }
        };

        wrapper.unmount();
    })

    it("Should call onEvent", () => {
        (wrapper.instance() as any).getChildContext().onBlur("attribute", "value");

        expect(eventValue.event).to.equals(Event.onBlur);
        expect(eventValue.params.nextValue).to.equals("value");
        expect(eventValue.params.prevValue).to.equals("");        
    });

});
