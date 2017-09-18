import * as React from "react";
import {expect} from "chai";
import {mount, ReactWrapper} from "enzyme";
import {AutoUpdate} from "../src";
import {AutoUpdateProps} from "../src/AutoUpdate";

describe("<AutoUpdate/>", () => {
    let wrapper: ReactWrapper<AutoUpdateProps, void>;

    const attr = "phone";
    const value = () => undefined;
    let isTriggered = false;

    const onChange = () => undefined;
    const onBlur = () => undefined;
    const onFocus = () => undefined;
    const onMount = () => undefined;

    const context = {
        id: "1",

        name: "phone",
        value: 1,

        onAttributeChange: () => isTriggered = true,
        onChange, onFocus, onBlur, onMount,
    };


    beforeEach(() => {
        wrapper = mount(
            <AutoUpdate attribute={attr} value={value}>
                <div/>
            </AutoUpdate>,
            {context}
        );
    });

    afterEach(() => {
        wrapper.unmount();
        isTriggered = false;
    });

    it("Should trigger `onAttributeChange` on `childContext().onBlur`", async () => {
        const node = wrapper.getNode() as any;

        await node.getChildContext().onBlur();

        expect(isTriggered).to.be.true;
    });

});
