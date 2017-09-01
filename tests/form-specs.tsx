import * as React from "react";

import {expect} from "chai";
import {mount, ReactWrapper} from "enzyme";

import * as sinon from "sinon";
import {Form, FormState, FormProps} from "../src/Form";
import {ExampleModel} from "./helpers/ExampleModel";
import {FormContext} from "../src/Form/FormContext";
// tslint:disable-next-line
import {SinonSpy} from "sinon";

describe("<Form/>", () => {
    let wrapper: ReactWrapper<FormProps<ExampleModel>, FormState<ExampleModel>>;

    let node: Form<ExampleModel>;

    type ExampleForm = new() => Form<ExampleModel>;
    const ExampleForm: ExampleForm = Form as any;

    const instantiateExampleModel = () => new ExampleModel();

    const field = "testField";
    const value = "testValue";
    const element = document.createElement("div");

    beforeEach(() => {
        wrapper = mount(
            <ExampleForm method="post" instantiate={instantiateExampleModel}/>
        );
        node = wrapper.getNode() as any;

        sinon.spy(node, "forceUpdate");
    });

    afterEach(() => {
        wrapper.unmount();

        (node.forceUpdate as any).restore();
    });

    it("Should put value to `model` if field changed", () => {
        node.getChildContext().onChange(field, value);

        expect(wrapper.state("model")).to.contain({[field]: value});

        expect((node.forceUpdate as SinonSpy).called).to.be.true;
    });

    it("Should ignore value if `model` contain same", () => {
        node.getChildContext().onChange(field, value);
        expect(wrapper.state("model")).to.contain({[field]: value});
        expect((node.forceUpdate as SinonSpy).calledOnce).to.be.true;

        node.getChildContext().onChange(field, value);
        expect((node.forceUpdate as SinonSpy).calledTwice).to.be.false;
    });

    it("Should put element to `mounted` on mount", () => {
        node.getChildContext().onMount(field, element);

        expect(wrapper.state("mounted")).to.contain({[field]: element});

        expect((node.forceUpdate as SinonSpy).called).to.be.true;
    });

    it("Should ignore element if `mounted` contain same", () => {
        node.getChildContext().onMount(field, element);
        expect(wrapper.state("mounted")).to.contain({[field]: element});
        expect((node.forceUpdate as SinonSpy).calledOnce).to.be.true;

        node.getChildContext().onMount(field, element);
        expect((node.forceUpdate as SinonSpy).calledTwice).to.be.false;
    });

    it("Should remove element on unmount", () => {
        node.getChildContext().onMount(field, element);
        expect(wrapper.state("mounted")).to.contain({[field]: element});
        expect((node.forceUpdate as SinonSpy).called).to.be.true;
    });

    it("Should not update if `mounted` is empty on unmount", () => {
        node.getChildContext().onMount(field, element);
        expect(wrapper.state("mounted")).to.contain({[field]: element});
        expect((node.forceUpdate as SinonSpy).calledOnce).to.be.true;

        node.getChildContext().onUnmount(field);
        expect(wrapper.state("mounted")).to.not.contain([field]);
    });
});
