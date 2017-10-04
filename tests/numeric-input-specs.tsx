import * as React from "react";
import {expect} from "chai";
import {NumericInput} from "../src/Input";
import {mount, ReactWrapper} from "enzyme";
import {FormGroupContext} from "../src/FormGroup/FormGroupContext";

describe("<NumericInput/>", () => {
    let wrapper: ReactWrapper<React.HTMLProps<HTMLInputElement>, any>;

    let previousContext: FormGroupContext;

    const name = "fieldName";
    const initialValue = "undefined";

    let testValue = "undefined";

    const onChange = (arg: any) => testValue = arg;
    const onBlur = (...args) => undefined;
    const onFocus = (...args) => undefined;
    const onMount = (...args) => undefined;
    const onAttributeChange = (...args) => undefined;

    const id = "prefix-" + (new Date());

    const optionsTrigger = ({action, value, field, contextExpect, propsExpect}) => {
        let contextTriggered = false;
        let propsTriggered = false;

        const fieldTriggered = `${field}Triggered`;

        wrapper.setProps({
            [field]: (event: any) => {
                propsTriggered = true;
                expect(event[fieldTriggered].value).to.be.equal(value);
            }
        });

        wrapper.setContext(previousContext = {
            ...previousContext,
            [field]: () => contextTriggered = true,
        });

        wrapper.simulate(action, {
            [fieldTriggered]: {
                value,
            },
            defaultPrevented: !contextExpect,
        });

        expect(contextTriggered).to.be.equal(contextExpect);
        expect(propsTriggered).to.be.equal(propsExpect);
    };

    beforeEach(() => {
        const context: FormGroupContext = previousContext = {
            id,
            name,
            onChange, onBlur, onFocus, onMount, onAttributeChange,
            value: initialValue,
        };

        wrapper = mount(<NumericInput/>, {context});
    });

    afterEach(() => {
        wrapper.unmount();
        testValue = "undefined";
    });

    it("Should trigger both `props.onChange` and `context.onChange` onInput event", () => {
        const options = {
            action: "input",
            value: "next-value",
            field: "onChange",
            contextExpect: true,
            propsExpect: true,
        };

        optionsTrigger(options);
    });

    it("Should set empty string when `currentTarget.value` is empty onInput event", () => {
        wrapper.setContext({
            ...wrapper.context(),
            ...{
                value: undefined,
            }
        });

        wrapper.simulate("input");

        expect(testValue).to.equal("");
    });

    it("Should trigger `props.onChange` without `context.onChange` onInput event", () => {
        const options = {
            action: "input",
            value: "next-value",
            field: "onChange",
            contextExpect: false,
            propsExpect: true,
        };

        optionsTrigger(options);
    });

    it("Should ignore onChange event", () => {
        const options = {
            action: "change",
            value: "next-value",
            field: "onChange",
            contextExpect: false,
            propsExpect: false,
        };

        optionsTrigger(options);
    });
});
