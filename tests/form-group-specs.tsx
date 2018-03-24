import * as React from "react";
import { expect } from "chai";
import { ReactWrapper, mount } from "enzyme";

import { ExampleModel } from "./helpers/ExampleModel";

import { Input } from "../src/Input/Input";
import { FormContext } from "../src/Form/FormContext";
import { FormGroup, FormGroupProps } from "../src/FormGroup";
import { FormGroupDefaultProps } from "../src/FormGroup/FormGroupProps";

describe("<FormGroup />", () => {

    let wrapper: ReactWrapper<FormGroupProps, any>;
    let handler;
    let mountHandler;
    let unmountHandler;
    let node: FormGroup;
    let previousContext;
    const name = "fieldName";

    const handleChange = (...args) => handler(...args);
    const handleMount = (...args) => mountHandler(...args);
    const handleUnmount = (...args) => unmountHandler(...args);

    beforeEach(() => {
        handler = (() => undefined)();
        mountHandler = () => undefined;
        unmountHandler = () => undefined;
        const commonHandle = () => undefined;

        commonHandle();
        const context: FormContext = previousContext = {
            values: [],
            addError: commonHandle,
            getError: commonHandle,

            onChange: handleChange,
            onMount: handleMount,
            onUnmount: handleUnmount,
            onReset: commonHandle,

            validate: commonHandle,
            getDOMElement: commonHandle,

            isLoading: false,
        };
        wrapper = mount(
            <FormGroup
                {...FormGroupDefaultProps}
                name={name}
            >
                <Input />
            </FormGroup>,
            { context }
        );
        node = wrapper.instance() as any;
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should render input inside itself", () => {
        expect(wrapper.contains(<Input />)).to.be.true;
    });

    it("Should add class `has-focus` when `context.onFocus` triggered", () => {
        expect(wrapper.getDOMNode().className).not.to.contain("has-focus");
        node.getChildContext().onFocus();
        expect(wrapper.getDOMNode().className).to.contain("has-focus");
    });

    it("Should remove class `has-focus` when `context.onBlur` triggered", () => {
        node.getChildContext().onFocus();
        expect(wrapper.getDOMNode().className).to.contain("has-focus");
        node.getChildContext().onBlur();
        expect(wrapper.getDOMNode().className).not.to.contain("has-focus");
    });

    it("Should have class `has-error` when value with error provided", () => {
        expect(wrapper.getDOMNode().className).not.to.contain("has-error");
        wrapper.setContext({
            ...previousContext,
            values: [
                {
                    attribute: name,
                    value: undefined,
                    error: "Some error",
                    model: new ExampleModel(),
                }
            ],
        });
        expect(wrapper.getDOMNode().className).to.contain("has-error");
    });

    it("Should trigger `context.handleChange` when `childContext.onChange` is triggered", () => {
        let changedValue;
        let changedField;
        const newValue = "newValue";
        handler = (receivedField, newReceivedValue) => {
            changedValue = newReceivedValue;
            changedField = receivedField;
        };
        node.getChildContext().onChange(newValue);

        expect(changedField).to.be.equal(name);
        expect(changedValue).to.be.equal(newValue);
    });

    it("Should trigger `context.onChange` when `childContext.onAttributeChange` is triggered", () => {
        let changedValue;
        let changedField;
        const newValue = "newValue";
        const field = "email";
        handler = (receivedField, newReceivedValue) => {
            changedValue = newReceivedValue;
            changedField = receivedField;
        };
        node.getChildContext().onAttributeChange(field, newValue);

        expect(changedField).to.be.equal(field);
        expect(changedValue).to.be.equal(newValue);
    });

    it("Should add `childContext.value` from `context.values` collection", () => {
        expect(node.getChildContext().value).to.not.exist;
        const parentContextValue = "string";
        wrapper.setContext({
            ...previousContext,
            values: [
                {
                    attribute: "notThisFormGroupProperty",
                    error: "Some error",
                    model: new ExampleModel(),
                },
                {
                    attribute: name,
                    value: parentContextValue,
                    model: new ExampleModel(),
                },
            ],
        });
        expect(node.getChildContext().value).to.be.equal(parentContextValue);
    });

    it("Should add `childContext.name` from `props.name`", () => {
        expect(node.getChildContext().name).to.be.equal(node.props.name);
    });

    it("Should add ID with prefix to context", () => {
        const pattern = `^${FormGroupDefaultProps.idPrefix}_\\d+$`;
        expect(node.getChildContext().id).to.match(new RegExp(pattern));
        expect(node.getChildContext().id).to.contain(node.id);

        const newIdPrefix = "id";
        wrapper.setProps({
            idPrefix: newIdPrefix,
        });
        expect(node.getChildContext().id).to.contain(newIdPrefix);
    });

    it("Should call `context.onUnmount` when unmount", () => {
        let unmountTriggered = false;
        unmountHandler = () => unmountTriggered = true;
        wrapper.unmount();
        expect(unmountTriggered).to.be.true;
    });
});
