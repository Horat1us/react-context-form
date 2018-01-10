import * as React from "react";
import * as sinon from "sinon";
import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";

import { Child } from "./helpers/Child";

import { InputContextTypes } from "../src/Input/InputContext";
import { AutoFocus, AutoFocusProps } from "../src/AutoFocus";
import { FormContextTypes } from "../src/Form/FormContext";

describe("<AutoFocus/>", () => {
    let wrapper: ReactWrapper<AutoFocusProps, void>;
    let node: AutoFocus;

    const inputElement = document.createElement("input");
    const getDOMElement = (): HTMLInputElement => inputElement;
    const commonHandler = () => undefined;

    beforeEach(() => {
        const context = {
            getDOMElement,
            id: "id",
            name: "name",
            onChange: commonHandler,
            onAttributeChange: commonHandler,
            onFocus: commonHandler,
            onBlur: commonHandler,
            onMount: commonHandler,
            validate: commonHandler
        };

        wrapper = mount(
            <AutoFocus groupName="test" to="testFocus">
                <Child />
            </AutoFocus>,
            { context, childContextTypes: { ...InputContextTypes, ...{ validate: FormContextTypes.validate } } }
        );

        node = wrapper.instance() as any;
        sinon.spy(inputElement, "focus");
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should focused element if group valid", () => {
        (node as any).changeFocus(false);
        expect((inputElement.focus as sinon.SinonSpy).called).to.be.false;

        (node as any).changeFocus(true);
        expect((inputElement.focus as sinon.SinonSpy).called).to.be.true;
    });

});
