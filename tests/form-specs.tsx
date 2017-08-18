import * as React from "react";

import {expect} from "chai";
import {mount} from "enzyme";

import * as sinon from "sinon";
import {Form} from "../src/Form";
import {ReactWrapper} from "enzyme";
import {FormProps} from "../src/Form/FormProps";
import {FormState} from "../src/Form/FormState";
import {ExampleModel} from "./helpers/ExampleModel";

describe("<Form/>", () => {
    let wrapper: ReactWrapper<FormProps<ExampleModel>, FormState<ExampleModel>>;

    type ExampleForm = new() => Form<ExampleModel>;
    const ExampleForm: ExampleForm = Form as any;

    beforeEach(() => {
        wrapper = mount(
            <ExampleForm/>
        );
    });
});