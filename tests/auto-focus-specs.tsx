import * as React from "react";
import {expect} from "chai";
import {mount, ReactWrapper} from "enzyme";
import {AutoFocus, AutoFocusProps, AutoFocusContext} from "../src/AutoFocus";
import {Child} from "./helpers/Child";
import * as sinon from "sinon";


describe("<AutoFocus/>", () => {
    let wrapper: ReactWrapper<AutoFocusProps, void>;
    let node: AutoFocus;

    const inputElement = document.createElement("input");
    const getDOMElement = (): HTMLInputElement => inputElement;

    beforeEach(() => {
        const context: AutoFocusContext = {
            getDOMElement
        };

        wrapper = mount(
            <AutoFocus groupName="test" to="testFocus">
                <Child/>
            </AutoFocus>,
            {context}
        );

        node = wrapper.getNode() as any;
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
