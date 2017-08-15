import * as React from 'react';
import {expect} from 'chai';
import {mount} from "enzyme"
import {FormGroup} from "../src/FormGroup/FormGroup";
import {Input} from "../src/Input/Input";
import {FormContext} from "../src/Form/FormContext";

describe('<FormGroup />', () => {

    let wrapper;
    beforeEach(() => {
        const context:FormContext = {

        };
        wrapper = mount(<FormGroup
            name="anc"
            component={Input as any}
        />, {context});
    });

    it('Should render input inside itself', () => {
        const wrapper = mount(<FormGroup
            name="anc"
            component={Input as any}
        />)
    });
});