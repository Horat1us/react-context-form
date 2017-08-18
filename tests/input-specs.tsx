import * as React from "react";
import {expect} from "chai";
import {Input, InputProps} from "../src/Input";
import {mount, ReactWrapper} from "enzyme";
import {FormGroupContext} from "../src/FormGroup/FormGroupContext";

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

    const optionsTrigger = ({action, value, field, contextExpect, propsExpect}) => {
        let contextTriggered = false;
        let propsTriggered = false;

        const fieldTriggered = `${field}Triggered`;

        wrapper.setProps({
            [field]: (event: any) => {
                propsTriggered = true;
                expect(event[fieldTriggered].value).to.be.equal(value);
            }
        });

        wrapper.setContext({
            onChange, onBlur, onFocus,
            name,
            [field]: () => contextTriggered = true,
        });

        wrapper.simulate(action, {
            [fieldTriggered]: {
                value,
            },
            defaultPrevented: !contextExpect,
        });

        expect(contextTriggered).to.be.equal(contextExpect);
        expect(propsTriggered).to.be.equal(propsExpect);
    };

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
        const options = {
            action: "change",
            value: "next-value",
            field: "onChange",
            contextExpect: true,
            propsExpect: true,
        };

        optionsTrigger(options);
    });

    it("Should trigger both `props.onBlur` and `context.onBlur`", () => {
        const options = {
            action: "blur",
            value: true,
            field: "onBlur",
            contextExpect: true,
            propsExpect: true,
        };

        optionsTrigger(options);
    });

    it("Should trigger both `props.onFocus` and `context.onFocus`", () => {
        const options = {
            action: "focus",
            value: true,
            field: "onFocus",
            contextExpect: true,
            propsExpect: true,
        };

        optionsTrigger(options);
    });

    it("Should trigger `props.onFocus` without `context.onFocus`", () => {
        const options = {
            action: "focus",
            value: true,
            field: "onFocus",
            contextExpect: false,
            propsExpect: true,
        };

        optionsTrigger(options);
    });

    it("Should trigger `props.onBlur` without `context.onBlur`", () => {
        const options = {
            action: "blur",
            value: true,
            field: "onBlur",
            contextExpect: false,
            propsExpect: true,
        };

        optionsTrigger(options);
    });

    it("Should trigger `props.onChange` without `context.onChange`", () => {
        const options = {
            action: "change",
            value: "next-value",
            field: "onChange",
            contextExpect: false,
            propsExpect: true,
        };

        optionsTrigger(options);
    });
});
