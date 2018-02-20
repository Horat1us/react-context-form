import * as React from "react";
import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";

import { ShowPasswordButton } from "../src/ShowPasswordButton";

describe("<ShowPasswordButton/>", () => {
    let wrapper: ReactWrapper<any, any>;

    let triggered;

    let context = {
        onChangeVisibility: (state?: boolean) => () => triggered = true
    };

    beforeEach(() => {
        wrapper = mount(
            <ShowPasswordButton>
                <div />
            </ShowPasswordButton>,
            { context }
        );
    });

    afterEach(() => {
        wrapper.unmount();
        triggered = false;
    });

    it("Should trigger `context.onChangeVisibility` on click", () => {
        wrapper.simulate("click");

        expect(triggered).to.be.true;
    });

    it("Should trigger `context.onChangeVisibility` on mouse event if according prop passed", () => {
        wrapper.setProps({
            hoverToShow: true
        });
        wrapper.simulate("mouseOver");

        expect(triggered).to.be.true;
        triggered = false;

        wrapper.simulate("mouseLeave");
        expect(triggered).to.be.true;
    });

    it("Should render only children if context does not passed", () => {
        wrapper.unmount();
        wrapper = mount(
            <ShowPasswordButton>
               <div>content</div>
            </ShowPasswordButton>
        );

        expect(wrapper.getDOMNode().innerHTML).to.equals("content");
    });
});
