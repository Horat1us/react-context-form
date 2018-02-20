import * as React from "react";
import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";

import { PasswordInput } from "../src/Input";
import { FormGroupContext } from "../src/FormGroup/FormGroupContext";

describe("<PasswordInput/>", () => {
    let wrapper: ReactWrapper<any, any>;

    let previousContext: FormGroupContext;

    const name = "fieldName";
    const initialValue = "undefined";
    const commonHandler = () => undefined;

    const onChange = commonHandler;
    const onBlur = commonHandler;
    const onFocus = commonHandler;
    const onMount = commonHandler;
    const onAttributeChange = commonHandler;

    const id = "prefix-" + (new Date());

    beforeEach(() => {
        commonHandler();
        const context: FormGroupContext = previousContext = {
            id,
            name,
            onChange, onBlur, onFocus, onMount, onAttributeChange,
            value: initialValue,
        };

        wrapper = mount(<PasswordInput>
            <i />
        </PasswordInput>, { context });
    });

    afterEach(() => wrapper.unmount());

    it("Should change input type on click" , () => {
        wrapper.find(".btn_view").simulate("click");
        expect(wrapper.state().isHidden).to.be.false;

        wrapper.find(".btn_view").simulate("click");
        expect(wrapper.state().isHidden).to.be.true;
    });

    it("Should change input type on hover if according prop passed" , () => {
        wrapper.setProps({
            hoverToShow: true
        });

        wrapper.find(".btn_view").simulate("mouseOver");
        expect(wrapper.state().isHidden).to.be.false;

        wrapper.find(".btn_view").simulate("mouseOver");
        expect(wrapper.state().isHidden).to.be.false;

        wrapper.find(".btn_view").simulate("mouseLeave");
        expect(wrapper.state().isHidden).to.be.true;
    });
});
