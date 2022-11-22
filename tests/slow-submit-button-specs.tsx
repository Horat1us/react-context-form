import * as React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import { useFakeTimers, SinonFakeTimers } from "sinon";

import { Child } from "./helpers/Child";
import { Loading } from "./helpers/Loading";

import { SubmitButtonContext } from "../src/SubmitButton/SubmitButtonContext";
import { SlowSubmitButton } from "../src/SlowSubmitButton";

describe("<SlowSubmitButton />", () => {
    let wrapper;
    let timer: SinonFakeTimers;
    const duration = 500;
    const step = 100;

    beforeEach(() => {
        const context: SubmitButtonContext = {
            isLoading: false,
        };
        wrapper = mount(
            <SlowSubmitButton loadingComponent={<Loading />} duration={duration}>
                <Child />
            </SlowSubmitButton>,
            { context }
        );

        timer = useFakeTimers();
    });

    afterEach(() => {
        if (!timer) {
            return;
        }
        timer.restore();
    });

    it("should show <Child/> by default (context.isLoading = false)", () => {
        expect(wrapper.contains(<Child />)).to.be.true;
        expect(wrapper.contains(<Loading />)).to.be.false;
    });

    it("should show <Loading/> when context switched (context.isLoading = true)", () => {
        wrapper.setContext({
            isLoading: true,
        });

        wrapper.update();

        expect(wrapper.contains(<Child />)).to.be.false;
        expect(wrapper.contains(<Loading />)).to.be.true;
    });

    it("Should not show <Child/> after changing context (context.isLoading = false)", () => {
        wrapper.setContext({
            isLoading: true,
        });
        wrapper.setContext({
            isLoading: false,
        });

        wrapper.update();

        expect(wrapper.contains(<Child />)).to.be.false;
        expect(wrapper.contains(<Loading />)).to.be.true;
    });

    it("should show <Child /> after changing context (isLoading = true) and after duration", () => {
        wrapper.setContext({
            isLoading: true,
        });
        wrapper.setContext({
            isLoading: false,
        });

        timer.tick(duration);
        wrapper.update();
        expect(wrapper.contains(<Child />)).to.be.true;
        expect(wrapper.contains(<Loading />)).to.be.false;
    });

    it("should show <Loading/> while loading is going on", () => {
        const doubleDuration = 1000;

        wrapper.setContext({
            isLoading: true,
        });

        wrapper.update();

        timer.tick(doubleDuration);
        expect(wrapper.contains(<Loading />)).to.be.true;
    });

    it("should correctly set second loading", () => {
        wrapper.setContext({
            isLoading: false,
        });
        wrapper.update();

        timer.tick(duration);
        expect(wrapper.contains(<Child />)).to.be.true;
        expect(wrapper.contains(<Loading />)).to.be.false;
        wrapper.setContext({
            isLoading: true,
        });
        wrapper.update();

        expect(wrapper.contains(<Child />)).to.be.false;
        expect(wrapper.contains(<Loading />)).to.be.true;
    });
});
