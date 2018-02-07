import * as React from "react";
import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";

import { AutoUpdate } from "../src";
import { AutoUpdateProps } from "../src/AutoUpdate";

describe("<AutoUpdate/>", () => {
    let wrapper: ReactWrapper<AutoUpdateProps, void>;

    const attr = "phone";
    let isTriggered = false;
    let isFocused = false;
    const commonHandler = () => undefined;

    const value = commonHandler;
    const onChange = commonHandler;
    const onBlur = commonHandler;
    const onFocus = commonHandler;
    const onMount = commonHandler;
    const getDOMElement = () => {
        isFocused = true;
        return document.createElement("div");
    };

    const context = {
        id: "1",

        name: "phone",
        value: 1,

        onAttributeChange: () => isTriggered = true,
        onChange, onFocus, onBlur, onMount, getDOMElement
    };

    beforeEach(() => {
        commonHandler();
        wrapper = mount(
            <AutoUpdate attribute={attr} value={value}>
                <div />
            </AutoUpdate>,
            { context }
        );
    });

    afterEach(() => {
        wrapper.unmount();
        isTriggered = false;
        isFocused = false;
    });

    it("Should trigger `onAttributeChange` on `childContext().onBlur`", () => {
        const node = wrapper.instance() as any;

        node.getChildContext().onBlur();

        expect(isTriggered).to.be.true;
    });

    it("Should trigger `getDomElement` on `childContext().onBlur`", () => {
        const node = wrapper.instance() as any;

        node.getChildContext().onBlur();

        expect(isFocused).to.be.true;
    });

    it("Should not call `focus` and `blur` if element is not HTML instance event on `childContext().onBlur`", () => {
        const node = wrapper.instance() as any;
        let isFocusTriggered = false;
        let isBlurTriggered = false;

        const focusHandler = () => isFocusTriggered = true;
        const blurHandler = () => isBlurTriggered = true;
        wrapper.setContext({
            getDOMElement: () => {
                const element = document.createElement("div");
                element.focus = focusHandler;
                element.blur = blurHandler;

                return element;
            }
        });

        node.getChildContext().onBlur();

        expect(isFocusTriggered).to.be.true;
        expect(isBlurTriggered).to.be.true;

        isFocusTriggered = false;
        isBlurTriggered = false;
        wrapper.setContext({
            getDOMElement: () => {
                return {
                    focus: focusHandler,
                    blur: blurHandler
                }
            }
        });

        node.getChildContext().onBlur();

        expect(isFocusTriggered).to.be.false;
        expect(isBlurTriggered).to.be.false;
    });

    it("Should update on input change when property onChange is passed", async () => {
        wrapper.setProps({
            onChange: true,
        });

        const node = wrapper.instance() as any;
        let attributeChanged = false;

        wrapper.setContext({
            onAttributeChange: () => attributeChanged = true,
        });

        node.getChildContext().onChange("");

        expect(attributeChanged).to.be.true;
    });
});
