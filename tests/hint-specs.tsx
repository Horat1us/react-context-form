import * as React from "react";
import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";

import { Hint } from "../src";

describe("<Hint/>", () => {
    let wrapper: ReactWrapper<React.HTMLProps<HTMLSpanElement>, void>;
    const hintText = "You should enter your name here";
    const context = {
        error: undefined,
    };

    beforeEach(() => {
        wrapper = mount(
            <Hint>{hintText}</Hint>,
            {
                context,
            }
        );
    });

    it("Should render child when `context.error` is empty", () => {
        expect(wrapper.getDOMNode().innerHTML).to.be.contain(hintText);
    });

    it("Should render error instead of hint text if `context.error` is present", () => {
        const errorText = "Your name contains invalid symbols";
        wrapper.setContext({
            error: errorText,
        });
        const innerHTML = wrapper.getDOMNode().innerHTML;
        expect(innerHTML).not.to.contain(hintText);
        expect(innerHTML).to.contain(errorText);
    });

    it("Should not render itself when to children and error is not provided", () => {
        wrapper.setProps({
            children: undefined,
        });
        expect(wrapper.getDOMNode()).to.not.exist;
    });
});
