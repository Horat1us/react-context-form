import * as React from "react";
import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";

import { LabelContext } from "../src/Label/LabelContext";
import { Label } from "../src";

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
        expect(wrapper.contains(<label htmlFor={context.id}>Name: </label>)).to.be.true;
    });
});