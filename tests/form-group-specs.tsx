import * as React from "react";
import {ReactWrapper, mount} from "enzyme";
import {expect} from "chai";
import {FormGroup, FormGroupProps} from "../src/FormGroup";
import {Input} from "../src/Input/Input";
import {FormContext} from "../src/Form/FormContext";

describe("<FormGroup />", () => {

    let wrapper: ReactWrapper<FormGroupProps, any>;
    let handler;

    beforeEach(() => {
        handler = () => undefined;
        const context: FormContext = {
            handleChange: (...args) => handler(...args),
            values: [],
        };
        wrapper = mount(
            <FormGroup
                name="fieldName"
            >
                <Input/>
            </FormGroup>,
            {context}
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should render input inside itself", () => {
        expect(wrapper).to.containMatchingElement(<Input/>);
    });
});