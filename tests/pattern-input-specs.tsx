import * as React from "react";
import {expect} from "chai";
import {PatternInput} from "../src/PatternInput/PatternInput"
import {mount, ReactWrapper} from "enzyme";
import {FormGroupContext} from "../src/FormGroup/FormGroupContext";
import {simulateInputChange} from "./helpers/simulateInputChange"
import * as sinon from "sinon";

describe("<PatternInput />", () => {
    const name = "fieldName";
    const id = "prefix-" + (new Date());
    const maxPatternLength = 2;
    const placeholder = () => undefined;
    let wrapper: ReactWrapper<React.HTMLProps<HTMLInputElement>, any>;
    let onChange;
    let spy;
    let value;
    placeholder();

    beforeEach(() => {
        value = "";
        spy = sinon.spy();
        onChange = (changedValue: string) => {
            spy();
            value = changedValue;
        };
        const context: FormGroupContext = {
            id,
            name,
            onChange,
            onBlur: placeholder,
            onFocus: placeholder,
            value: "",
        };
        wrapper = mount(
            <PatternInput regex={/\d{1,2}/}/>,
            {context}
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should not call change value that doesn't match pattern", () => {
        simulateInputChange(wrapper, "a");
        expect(spy.calledTwice).to.be.false;
    });

    it("Should call change for value that matches pattern", () => {
        simulateInputChange(wrapper, "12");
        expect(spy.called).to.be.true;
    });

    it("Shouldn't call change for too big value", () => {
        const newValue = "123";
        simulateInputChange(wrapper, newValue);
        expect(value).to.be.equal(newValue.substr(0, maxPatternLength));
    });

    it("Should trigger change only for digits", () => {
        const newValue = "1d";
        simulateInputChange(wrapper, newValue);
        expect(value).to.be.equal(newValue.replace(/\D/, ""));
    });

    it("Should trigger change on empty value", () => {
        simulateInputChange(wrapper);
        expect(spy.calledOnce).to.be.true;
    });
});
