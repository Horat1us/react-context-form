import * as React from "react";
import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";

import { ResetButton } from "../src/ResetButton";
import { Form, FormContextTypes } from "../src/Form";

import { ExampleModel } from "./helpers/ExampleModel";

describe("<ResetButton/>", () => {
    let wrapper: ReactWrapper<any, any>;

    const model = new ExampleModel();

    const formContext = (new Form({ instantiate: () => model })).getChildContext();

    beforeEach(() => {
        wrapper = mount(
            <ResetButton>
                <span>reset</span>
            </ResetButton>,
            { context: formContext, childContextTypes: FormContextTypes }
        );
    });

    afterEach(() => {
        wrapper.unmount();
        model.clear();
    });

    it("Should clear model on click if default not prevented", () => {
        const value = "email@mail.com";
        model.email = value;

        wrapper.simulate("click", {
            defaultPrevented: true
        });
        expect(model.getValue("email").value).to.equal(value);

        let clickTriggered = false;
        wrapper.setProps({
            onClick: () => clickTriggered = true
        });

        wrapper.simulate("click");
        expect(model.getValue("email").value).to.be.undefined;
        expect(clickTriggered).to.be.true;
    });
});
