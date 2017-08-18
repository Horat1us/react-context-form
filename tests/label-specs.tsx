import * as React from "react";
import {Label} from "../src";
import {expect} from "chai";
import {mount, ReactWrapper} from "enzyme";
import {FormGroupContext} from "../src/FormGroup/FormGroupContext";
import {LabelContext} from "../src/Label/LabelContext";

describe("<Label />", () => {
    let wrapper: ReactWrapper<React.HTMLProps<HTMLSpanElement>, void>;
    const context: LabelContext = {
        id: "prefix-123"
    };

    beforeEach(() => {
        wrapper = mount(
            <Label>Name: </Label>,
            {
                context,
            }
        );
    });

    it("Should add `htmlFor` from `context.id`", () => {
        expect(wrapper).to.containMatchingElement(<label htmlFor={context.id}>Name: </label>);
    });
});