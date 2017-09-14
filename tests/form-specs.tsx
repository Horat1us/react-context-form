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

    it("Should save values to localStorage if storageKey prop provided", () => {
        const localStorageEmulator = {};
        (window as any).localStorage = {
            setItem: (key: string, newValue: any) => {
                localStorageEmulator[key] = newValue;
            },
            getItem: () => undefined,
        };

        const changedPassword = Math.random().toString().repeat(10);
        const storageKey = "form";

        wrapper.setProps({
            storageKey,
        });
        node.getChildContext().onChange("password", changedPassword);
        wrapper.unmount();
        expect(localStorageEmulator).to.have.key(storageKey);

        const storedForm = JSON.parse(localStorageEmulator[storageKey]);
        expect(storedForm).to.have.property("password");
        expect(storedForm.password).to.be.equal(changedPassword);
    });

    it("Should have load values from localStorage if storageKey prop provided", async () => {
        const storedForm = {
            password: Math.random().toString().repeat(2),
            email: "person@example.com",
        };
        const storedFormName = "storedForm";

        (window as any).localStorage = {
            setItem: () => undefined,
            getItem: (key: string) => {
                return key === storedFormName ? JSON.stringify(storedForm) : undefined;
            }
        };

        wrapper.setProps({
            storageKey: storedFormName,
        });

        // Can not emulate onMount (componentWillMount wont be called)
        (wrapper.instance() as Form<ExampleModel>).loadFromStorage();

        expect(wrapper.state().model.password).to.be.equal(storedForm.password);
        expect(wrapper.state().model.email).to.be.equal(storedForm.email);
    });

    it("Should add error and call forceUpdate", async () => {
        const error = {
            attribute: "email",
            details: "Some error"
        };

        node.getChildContext().addError(error);

        expect((node.forceUpdate as SinonSpy).calledOnce).to.be.true;
        expect(wrapper.state().model.getError(error.attribute).details).to.equal(error.details);
    });
});
