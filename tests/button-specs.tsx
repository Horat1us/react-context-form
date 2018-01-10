import * as React from "react";
import { expect } from "chai";

import { Button, ButtonProps } from "../src/Button";
import { mount, ReactWrapper } from "enzyme";
import { InputContext } from "../src/Input";

describe("<Button/>", () => {
    let wrapper: ReactWrapper<ButtonProps, any>;

    let node: HTMLButtonElement;

    const initialValue = "undefined";

    const commonHandler = () => undefined;

    let onChangeTriggered = false;
    let onBlurTriggered = false;
    let onFocusTriggered = false;

    const onChange = () => {
        onChangeTriggered = true;
        return undefined;
    };
    const onBlur = () => {
        onBlurTriggered = true;
        return undefined;
    };
    const onFocus = () => {
        onFocusTriggered = true;
        return undefined;
    };
    const onMount = commonHandler;
    const onAttributeChange = commonHandler;

    const id = "prefix-" + (new Date());

    beforeEach(() => {
        const context: InputContext = {
            id,
            name,
            onChange, onBlur, onFocus, onMount, onAttributeChange,
            value: initialValue,
        };
        wrapper = mount(
            <Button action={true} />,
            { context }
        );
        node = wrapper.instance() as any;
    });

    afterEach(() => {
        wrapper.unmount();
        onChangeTriggered = false;
        onBlurTriggered = false;
        onFocusTriggered = false;
    });

    it("Should trigger `context.onChange` on click", () => {
        wrapper.simulate("click");

        expect(onChangeTriggered).to.be.true;
    });

    it("Should set active class name when `context.value` equals `props.action`", () => {
        wrapper.setContext({
            ...wrapper.context(),
            ...{
                value: true
            }
        });
        wrapper.simulate("click");

        expect(node.className).to.contain("is-active");

        wrapper.setContext({
            ...wrapper.context(),
            ...{
                value: false
            }
        });
        wrapper.simulate("click");

        expect(node.className).to.not.contain("is-active");
    });

    it("Should trigger `context.onBlur` on blur if default not prevented", () => {
        wrapper.simulate("blur", {
            defaultPrevented: false,
        });

        expect(onBlurTriggered).to.be.true;

        onBlurTriggered = false;

        wrapper.simulate("blur", {
            defaultPrevented: true,
        });

        expect(onBlurTriggered).to.be.false;
    });

    it("Should trigger `context.onFocus` on focus if default not prevented", () => {
        wrapper.simulate("focus", {
            defaultPrevented: false,
        });

        expect(onFocusTriggered).to.be.true;

        onFocusTriggered = false;

        wrapper.simulate("focus", {
            defaultPrevented: true,
        });

        expect(onFocusTriggered).to.be.false;
    });
});
