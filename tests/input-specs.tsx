import * as React from "react";
import {expect} from "chai";
import {Input} from "../src/Input";
import {mount, ReactWrapper} from "enzyme";
import {FormGroupContext} from "../src/FormGroup/FormGroupContext";
import {TransformTypes} from "../src/Input/TransformTypes";
import {BaseInputProps} from "../src/Input/BaseInputProps";

describe("<Input />", () => {
    let wrapper: ReactWrapper<BaseInputProps<HTMLInputElement>, any>;

    let node: HTMLInputElement;
    let previousContext: FormGroupContext;

    const name = "fieldName";
    const initialValue = "undefined";
    let testValue;

    const onChange = (value) => {
        testValue = value;
        return undefined
    };
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
        wrapper = mount(
            <Input transform={TransformTypes.capitalize}/>,
            {context}
        );
        node = wrapper.getDOMNode() as any;
    });

    afterEach(() => {
        wrapper.unmount();
        testValue = "";
    });

    it("Should trigger both `props.onChange` and `context.onChange`", () => {
        const options = {
            action: "change",
            value: "next-value",
            field: "onChange",
            contextExpect: true,
            propsExpect: true,
        };

        optionsTrigger(options);
    });

    it("Should trigger both `props.onBlur` and `context.onBlur`", () => {
        const options = {
            action: "blur",
            value: true,
            field: "onBlur",
            contextExpect: true,
            propsExpect: true,
        };

        optionsTrigger(options);
    });

    it("Should trigger both `props.onFocus` and `context.onFocus`", () => {
        const options = {
            action: "focus",
            value: true,
            field: "onFocus",
            contextExpect: true,
            propsExpect: true,
        };

        optionsTrigger(options);
    });

    it("Should trigger `props.onFocus` without `context.onFocus`", () => {
        const options = {
            action: "focus",
            value: true,
            field: "onFocus",
            contextExpect: false,
            propsExpect: true,
        };

        optionsTrigger(options);
    });

    it("Should trigger `props.onBlur` without `context.onBlur`", () => {
        const options = {
            action: "blur",
            value: true,
            field: "onBlur",
            contextExpect: false,
            propsExpect: true,
        };

        optionsTrigger(options);
    });

    it("Should trigger `props.onChange` without `context.onChange`", () => {
        const options = {
            action: "change",
            value: "next-value",
            field: "onChange",
            contextExpect: false,
            propsExpect: true,
        };

        optionsTrigger(options);
    });

    it("Should have ID from context", () => {
        expect(wrapper).to.have.id(id);
    });

    it("Should add additional html props to DOM", () => {
        const placeholder = "Some text";
        wrapper.setProps({placeholder});
        expect(wrapper.getDOMNode().getAttribute("placeholder")).to.be.equal(placeholder);
    });

    it("Should capitalize value onChange", () => {
        const value = "sTRING";

        (wrapper.getNode() as any).handleChange({currentTarget: {value}});

        expect(testValue).to.equal("String");
    });

    it("Should uppercase value onChange", () => {
        const value = "string";

        wrapper.setProps({
            transform: TransformTypes.upperCase,
        });

        (wrapper.getNode() as any).handleChange({currentTarget: {value}});

        expect(testValue).to.equal("STRING");
    });
});
