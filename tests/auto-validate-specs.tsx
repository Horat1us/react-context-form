import * as React from "react";
import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";

import { Child } from "./helpers/Child";

import { InputContext } from "../src/Input";
import { ModelError } from "../src/Model/Model";
import { AutoValidate, AutoValidateProps } from "../src/AutoValidate";

describe("<AutoValidate/>", () => {
    let wrapper: ReactWrapper<AutoValidateProps, void>;
    let node: AutoValidate;

    const name = "fieldName";
    const initialValue = "undefined";

    interface ContextType extends InputContext {
        readonly validate: (group: string) => Promise<ModelError[]>;
    }

    const commonHandler = () => undefined;

    let onChangeTriggered = false;
    const onChange = () => {
        onChangeTriggered = true;
        return undefined;
    };

    let onBlurTriggered = false;
    const onBlur = () => {
        onBlurTriggered = true;
        return undefined;
    };

    let validateTriggered = false;
    const validate = async () => {
        validateTriggered = true;
        return [{
            attribute: "",
            details: ""
        }];
    };

    const onFocus = commonHandler;
    const onMount = commonHandler;
    const onAttributeChange = commonHandler;

    const id = "prefix-" + (new Date());

    beforeEach(() => {
        commonHandler();
        const context: ContextType = {
            id,
            name,
            onChange, onBlur, onFocus, onMount, onAttributeChange, validate,
            value: initialValue,
        };

        wrapper = mount(
            <AutoValidate groupName="test">
                <Child />
            </AutoValidate>,
            { context }
        );

        node = wrapper.instance() as any;
    });

    afterEach(() => {
        wrapper.unmount();
        validateTriggered = false;
        onBlurTriggered = false;
        onChangeTriggered = false;
    });

    it("Should trigger `context.onBlur` and not trigger `context.validate` when `props.onBlur` equals false", () => {
        wrapper.setProps({
            onBlur: false
        });

        node.getChildContext().onBlur();
        expect(validateTriggered).to.be.false;
        expect(onBlurTriggered).to.be.true;
    });

    it("Should trigger `context.onBlur` both `context.validate` when `props.onBlur` equals true", async () => {
        await node.getChildContext().onBlur();
        expect(validateTriggered).to.be.true;
        expect(onBlurTriggered).to.be.true;
    });

    it("Should trigger `context.onChange` both `context.validate` when `props.onLength` has been passed", async () => {
        wrapper.setProps({
            onBlur: false,
            onLength: 1
        });

        await node.getChildContext().onChange("11");
        expect(validateTriggered).to.be.true;
        expect(onChangeTriggered).to.be.true;
    });

    it("Should trigger `context.onChange` both `context.validate` when `props.on()` return true", async () => {
        wrapper.setProps({
            onBlur: false,
            on: () => true
        });

        await node.getChildContext().onChange("11");
        expect(validateTriggered).to.be.true;
        expect(onChangeTriggered).to.be.true;
    });

    it("Should trigger `context.onChange` both `context.validate` when `props.always` has been passed", async () => {
        wrapper.setProps({
            onBlur: false,
            always: true
        });

        await node.getChildContext().onChange("11");
        expect(validateTriggered).to.be.true;
        expect(onChangeTriggered).to.be.true;
    });
});
