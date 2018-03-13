import * as React from "react";
import { expect } from "chai";
import { mount, shallow } from "enzyme";

import { Loading } from "./helpers/Loading";
import { Child } from "./helpers/Child";

import { SubmitButton } from "../src/SubmitButton";
import { SubmitButtonContext } from "../src/SubmitButton/SubmitButtonContext";

describe("<SubmitButton />", () => {
    let wrapper;

    beforeEach(() => {
        const context: SubmitButtonContext = {
            isLoading: false,
        };
        wrapper = mount(
            <SubmitButton loadingComponent={<Loading />}>
                <Child />
            </SubmitButton>,
            { context }
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("should render `props.children` when not `context.isLoading`", () => {
        wrapper.setContext({
            isLoading: false,
        });
        expect(wrapper.contains(<Child />)).to.be.true;
    });

    it("should render `props.loadingComponent` instead of child when `context.isLoading`", () => {
        wrapper.setContext({
            isLoading: true,
        });
        expect(wrapper.contains(<Child />)).to.be.false;
        expect(wrapper.contains(<Loading />)).to.be.true;
    });

    it("should add `is-loading` className when `context.isLoading`", () => {
        wrapper.setContext({
            isLoading: true,
        });
        expect(wrapper.getDOMNode().className).to.contain("is-loading");
    });

    it("should add `width` attribute (saved with children) when `context.isLoading`", () => {
        const node: HTMLButtonElement = wrapper.getDOMNode();
        const widthWithChildren = node.offsetWidth.toString();
        wrapper.setContext({
            isLoading: true,
        });
        expect(wrapper.getDOMNode().getAttribute("style"))
            .to.be.equal(`width: ${widthWithChildren}px;`);
    });
});
