import * as React from "react";
import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";

import { OnValidate, OnValidateProps, OnValidateState, AutoValidate, Input, FormGroup, FormContext, Form, FormContextTypes } from "../src";
import { ExampleModel } from "./helpers/ExampleModel";

describe("<OnValidate />", () => {
    let wrapper: ReactWrapper<OnValidateProps, OnValidateState>;

    let onValidatedTriggered = false;
    const handleValidated = () => onValidatedTriggered = true;
    const model = new ExampleModel();

    const context: FormContext = new Form({
        instantiate: () => model
    }).getChildContext();

    beforeEach(() => {
        wrapper = mount(
            <OnValidate onValidated={handleValidated}>
                <FormGroup name="password">
                    <AutoValidate groupName="password" always>
                        <Input name="password" />
                    </AutoValidate>
                </FormGroup>
                <FormGroup name="email">
                    <AutoValidate groupName="email" always>
                        <Input name="email" />
                    </AutoValidate>
                </FormGroup>
            </OnValidate>,
            { context, childContextTypes: FormContextTypes }
        );
    });

    afterEach(() => {
        onValidatedTriggered = false;
        wrapper.unmount();
    });

    it("Should register validate groups on mount", () => {
        expect(wrapper.instance().state.validateGroups.get("email")).to.be.false;
        expect(wrapper.instance().state.validateGroups.get("password")).to.be.false;        
    });

    it("Should mark field as validate if it is", async () => {
        model.email ="test@email.com";
        await (wrapper.instance() as any).getChildContext().validate("email");

        expect(wrapper.state().validateGroups.get("email")).to.be.true;
        
        model.email ="testemail.com";
        await (wrapper.instance() as any).getChildContext().validate("email");
        
        expect(wrapper.state().validateGroups.get("email")).to.be.false;        
    });

    it("Should trigger 'onValidated' when all fields are validated", async () => {
        model.email ="test@email.com";
        model.password = "qwerty1234";

        await (wrapper.instance() as any).getChildContext().validate("email");
        await (wrapper.instance() as any).getChildContext().validate("password");

        expect(onValidatedTriggered).to.be.true;
    });
});
