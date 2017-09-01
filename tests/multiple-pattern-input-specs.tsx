import * as React from "react";
import {expect} from "chai";
import {mount, ReactWrapper} from "enzyme";
import {FormGroupContext} from "../src/FormGroup/FormGroupContext";
import * as sinon from "sinon";
import {MultiplePatternInput} from "../src/MultiplePatternInput/MuitlplePatternInput";
import {simulateInputChange} from "./helpers/simulateInputChange";

describe("<MultiplePatternInput />", () => {
    const placeholder = () => undefined;
    const name = "fieldName";
    const id = "prefix-" + (new Date());
    const defaultValue = "";
    const defaultContext = {
        id,
        name,
        onChange: (changedValue: string) => {
            spy();
            value = changedValue;
        },
        onBlur: placeholder,
        onFocus: placeholder,
        onMount: placeholder,
        value: "",
    };
    let wrapper: ReactWrapper<React.HTMLProps<HTMLInputElement>, any>;
    let spy;
    let value;
    let pattern;
    let context: FormGroupContext;

    const input = () => wrapper.find("input");
    const mountWrapper = () => {
        const patterns = Array.isArray(pattern) ? pattern : [pattern];
        wrapper = mount(
            <MultiplePatternInput patterns={patterns}/>,
            {context}
        );
    };

    placeholder();

    beforeEach(() => {
        pattern = "123";
        value = "";
        spy = sinon.spy();
        context = defaultContext;
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should change value on focus", () => {
        mountWrapper();

        expect(value).to.be.equal(defaultValue);
        input().simulate("focus");
        expect(value).to.be.equal(pattern);
    });

    it("Should not change on focus when value is not empty", () => {
        mountWrapper();
        wrapper.setContext({
            ...defaultContext,
            value: "1",
        });

        input().simulate("focus");
        expect(value).to.be.not.equal(pattern);
        expect(value).to.be.equal(defaultValue);
    });

    it("Should remove first string pattern on blur event and match", () => {
        mountWrapper();
        wrapper.setContext({
            ...defaultContext,
            value: pattern,
        });

        input().simulate("blur");
        expect(value).to.be.equal(defaultValue);
    });

    it("Should not remove first string pattern on blur event when value doesn't match", () => {
        mountWrapper();
        const newValue = value = pattern + "1";

        wrapper.setContext({
            ...defaultContext,
            value: newValue,
        });

        input().simulate("blur");
        expect(value).to.be.not.equal(defaultValue);
        expect(value).to.be.equal(newValue);
    });

    it("Should add first string pattern after change", () => {
        const initial = "1";
        mountWrapper();

        expect(value).to.be.equal(defaultValue);
        simulateInputChange(wrapper, initial);
        expect(value).to.be.not.equal(pattern);
        expect(value).to.be.equal(`${pattern}${initial}`);
    });

    it("Should append string pattern after filling regex pattern", () => {
        pattern = [
            /\d{1,2}/,
            ":",
            /\d{1,2}/,
        ];
        mountWrapper();

        const newValue = "123";
        simulateInputChange(wrapper, newValue);

        const firstPatternsLength = 2;
        const expectedValue = newValue.slice(0, firstPatternsLength)
            + pattern[1]
            + newValue.slice(firstPatternsLength);
        expect(value).to.be.equal(expectedValue);
    });

    it("Should remove string pattern when target value ends on it", () => {
        pattern = [
            /\d{1,2}/,
            ":",
            /\d{1,2}/,
        ];
        mountWrapper();

        const newValue = `12${pattern[1]}`;
        (input().getDOMNode() as HTMLInputElement).value = newValue;
        input().simulate("change");

        const expectedValue = newValue.match(pattern[0])[0];
        expect(value).to.be.equal(expectedValue);
    });

    it("Should correctly work with several patterns and with escaping special chars ('.')", () => {
        const newValue = "123456";
        pattern = [
            /\d/,
            " ",
            /\d{1,3}/,
            ".",
            /\d{1,2}/,
        ];
        mountWrapper();

        simulateInputChange(wrapper, newValue);

        const expectedValue = "1 234.56";
        expect(value).to.be.equal(expectedValue);
    });
});
