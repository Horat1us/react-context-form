import * as React from "react";
import {ReactWrapper, mount} from "enzyme";
import {expect} from "chai";
import {FormGroup, FormGroupProps} from "../src/FormGroup";
import {Input} from "../src/Input/Input";
import {FormContext} from "../src/Form/FormContext";
import {ExampleModel} from "./helpers/ExampleModel";
import {FormGroupDefaultProps} from "../src/FormGroup/FormGroupProps";

describe("<FormGroup />", () => {

    let wrapper: ReactWrapper<FormGroupProps, any>;
    let handler;
    let node: FormGroup;
    const name = "fieldName";

    const handleChange = (...args) => handler(...args);

    beforeEach(() => {
        handler = () => undefined;
        const context: FormContext = {
            handleChange,
            values: [],
        };
        wrapper = mount(
            <FormGroup
                {...FormGroupDefaultProps}
                name={name}
            >
                <input/>
            </FormGroup>,
            {context}
        );
        node = wrapper.getNode() as any;
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should render input inside itself", () => {
        expect(wrapper).to.containMatchingElement(<input/>);
    });

    it("Should add class `has-focus` when `context.onFocus` triggered", () => {
        expect(wrapper).not.to.have.className("has-focus");
        node.getChildContext().onFocus();
        expect(wrapper).to.have.className("has-focus");
    });

    it("Should remove class `has-focus` when `context.onBlur` triggered", () => {
        node.getChildContext().onFocus();
        expect(wrapper).to.have.className("has-focus");
        node.getChildContext().onBlur();
        expect(wrapper).not.to.have.className("has-focus");
    });

    it("Should have class `has-error` when value with error provided", () => {
        expect(wrapper).not.to.have.className("has-error");
        wrapper.setContext({
            values: [
                {
                    attribute: name,
                    value: undefined,
                    error: "Some error",
                    model: new ExampleModel(),
                }
            ],
            handleChange
        });
        expect(wrapper).to.have.className("has-error");
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

    it("Should add `childContext.value` from `context.values` collection", () => {
        expect(node.getChildContext().value).to.not.exist;
        const parentContextValue = "string";
        wrapper.setContext({
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
            handleChange
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
});
