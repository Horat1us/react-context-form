import * as React from "react";
import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";

import { PasswordGroup } from "../src/PasswordGroup";
import { FormGroup, FormGroupContextTypes } from "../src/FormGroup";
import { Form } from "../src/Form";
import { Input, InputContextTypes } from "../src/Input";

import { ExampleModel } from "./helpers/ExampleModel";

describe("<PasswordGroup/>", () => {
    let wrapper: ReactWrapper<any, any>;

    const formGroupInstance = (new FormGroup({ name: "test" }));
    formGroupInstance.context = (new Form({ instantiate: () => new ExampleModel() })).getChildContext();

    beforeEach(() => {
        wrapper = mount(
            <PasswordGroup>
                <Input />
            </PasswordGroup>,
            { context: formGroupInstance.getChildContext(), childContextTypes: FormGroupContextTypes }
        );
    });

    afterEach(() => wrapper.unmount());

    it("Should change state on `ChangeVisibility`", () => {
        expect(wrapper.state().isHidden).to.be.true;

        (wrapper.instance() as any).getChildContext().onChangeVisibility()();
        expect(wrapper.state().isHidden).to.be.false;

        (wrapper.instance() as any).getChildContext().onChangeVisibility()();
        expect(wrapper.state().isHidden).to.be.true;

        (wrapper.instance() as any).getChildContext().onChangeVisibility(true)();
        expect(wrapper.state().isHidden).to.be.true;

        (wrapper.instance() as any).getChildContext().onChangeVisibility(false)();
        expect(wrapper.state().isHidden).to.be.false;
    });
});
