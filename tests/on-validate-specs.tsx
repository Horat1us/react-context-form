import * as React from "react";
import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";

import { OnValidate, OnValidateProps, AutoValidate, Input, FormGroup, FormContext, Form, FormContextTypes } from "../src";
import { ExampleModel } from "./helpers/ExampleModel";

describe("<OnValidate />", () => {
    let wrapper: ReactWrapper<OnValidateProps, {}>;

    let onValidateTriggered = false;
    const handleValidate = () => onValidateTriggered = true;
    const model = new ExampleModel();

    const context: FormContext = new Form({
        instantiate: () => model
    }).getChildContext();

    beforeEach(() => {
        wrapper = mount(
            <OnValidate onValidate={handleValidate} groups={["password"]}>
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
        onValidateTriggered = false;
        wrapper.unmount();
    });

    it("Should trigger 'onValidated' when all fields are validated", async () => {
        model.email = "test@email.com";
        await (wrapper.instance() as any).getChildContext().validate("email");        
        expect(onValidateTriggered).to.be.false;

        await (wrapper.instance() as any).getChildContext().validate("password");
        model.password = "qwerty1234";
        expect(onValidateTriggered).to.be.true;
    });
});
