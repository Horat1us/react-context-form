import * as React from "react";
import {ReactWrapper, mount} from "enzyme";
import {expect} from "chai";
import {FormGroup, FormGroupProps} from "../src/FormGroup";
import {Input} from "../src/Input/Input";
import {FormContext} from "../src/Form/FormContext";
import {ExampleModel} from "./helpers/ExampleModel";

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
                name={name}
            >
                <Input/>
            </FormGroup>,
            {context}
        );
        node = wrapper.getNode() as any;
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should render input inside itself", () => {
        expect(wrapper).to.containMatchingElement(<Input/>);
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
});
