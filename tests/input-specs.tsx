import * as React from "react";
import {expect} from "chai";
import {Input, InputProps} from "../src/Input";
import {mount, ReactWrapper} from "enzyme";
import {FormGroupContext} from "../src/FormGroup/FormGroupContext";
import {FormEvent} from "react";

describe("<Input />", () => {
    let wrapper: ReactWrapper<InputProps, any>;

    let changeHandler;
    let blurHandler;
    let focusHandler;

    let node: HTMLInputElement;

    const name = "fieldName";
    const initialValue = "undefined";

    const onChange = (...args) => changeHandler(...args);
    const onBlur = (...args) => blurHandler(...args);
    const onFocus = (...args) => focusHandler(...args);

    beforeEach(() => {
        changeHandler = blurHandler = focusHandler = () => undefined;
        const context: FormGroupContext = {
            name,
            onChange, onBlur, onFocus,
            value: initialValue,
            error: undefined,
        };
        wrapper = mount(
            <Input/>,
            {context}
        );
        node = wrapper.getDOMNode() as any;
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should trigger both `props.onChange` and `context.onChange`", () => {
        let contextTriggered = false;
        let propsTriggered = false;
        const nextValue = "next-value";
        changeHandler = (event: FormEvent<HTMLInputElement>) => {
            contextTriggered = true;
            expect(event.currentTarget.value).to.be.equal(nextValue);
        };
        wrapper.setProps({
            onChange: () => propsTriggered = true,
        });
        wrapper.simulate("change", {currentTarget: {
            value: nextValue,
        }});
        expect(contextTriggered).to.be.true;
        expect(propsTriggered).to.be.true;
    });
});
