import * as React from "react";
import * as sinon from "sinon";
import { expect } from "chai";

// tslint:disable-next-line
import { SinonSpy } from "sinon";
import { mount, ReactWrapper } from "enzyme";

import { ExampleModel } from "./helpers/ExampleModel";

import { Form, FormState, FormProps } from "../src/Form";
import { FormGroup } from "../src/FormGroup/FormGroup";
import { Input } from "../src/Input/Input";

describe("<Form/>", () => {
    let wrapper: ReactWrapper<FormProps<ExampleModel>, FormState<ExampleModel>>;
    let node: Form<ExampleModel>;

    type ExampleForm = new () => Form<ExampleModel>;
    const ExampleForm: ExampleForm = Form as any;

    let model: ExampleModel;

    const instantiateExampleModel = () => {
        model = new ExampleModel();
        model.email = "email@eamil.com";
        model.password = "abcd10214568";
        return model;
    };

    let isOnSubmitTriggered;
    const onSubmit = async () => {
        isOnSubmitTriggered = true
    };
    let props = {
        instantiate: instantiateExampleModel,
        onSubmit,
        method: undefined
    };
    const field = "testField";
    const value = "testValue";
    const element = document.createElement("div");

    beforeEach(() => {
        isOnSubmitTriggered = false;
        wrapper = mount(
            <ExampleForm {...props}>
                <FormGroup name="email">
                    <Input />
                </FormGroup>
            </ExampleForm>
        );
        node = wrapper.instance() as any;
        sinon.spy(node, "forceUpdate");
        sinon.spy(wrapper.state().model, "removeErrors");
    });

    afterEach(() => {
        wrapper.unmount();
        (node.forceUpdate as any).restore();
        isOnSubmitTriggered = false;
        props = {
            instantiate: instantiateExampleModel,
            onSubmit,
            method: undefined
        };
    });

    it("Should put value to `model` if field changed", () => {
        node.getChildContext().onChange(field, value);
        expect(wrapper.state("model")).to.contain({ [field]: value });
        expect((node.forceUpdate as SinonSpy).called).to.be.true;
    });

    it("Should ignore value if `model` contain same", () => {
        node.getChildContext().onChange(field, value);
        expect(wrapper.state("model")).to.contain({ [field]: value });
        expect((node.forceUpdate as SinonSpy).calledOnce).to.be.true;
        node.getChildContext().onChange(field, value);
        expect((node.forceUpdate as SinonSpy).calledTwice).to.be.false;
    });

    it("Should put element to `mounted` on mount", () => {
        node.getChildContext().onMount(field, element);
        expect(wrapper.state("mounted")).to.contain({ [field]: element });
        expect((node.forceUpdate as SinonSpy).called).to.be.true;
    });

    it("Should ignore element if `mounted` contain same", () => {
        node.getChildContext().onMount(field, element);
        expect(wrapper.state("mounted")).to.contain({ [field]: element });
        expect((node.forceUpdate as SinonSpy).calledOnce).to.be.true;
        node.getChildContext().onMount(field, element);
        expect((node.forceUpdate as SinonSpy).calledTwice).to.be.false;
    });

    it("Should remove element on unmount", () => {
        node.getChildContext().onMount(field, element);
        expect(wrapper.state("mounted")).to.contain({ [field]: element });
        expect((node.forceUpdate as SinonSpy).called).to.be.true;
    });

    it("Should not update if `mounted` is empty on unmount", () => {
        node.getChildContext().onMount(field, element);
        expect(wrapper.state("mounted")).to.contain({ [field]: element });
        expect((node.forceUpdate as SinonSpy).calledOnce).to.be.true;
        node.getChildContext().onUnmount(field);
        node.getChildContext().onUnmount("not existing field");
        expect(wrapper.state("mounted")).to.not.contain([field]);
    });

    it("Should save values to localStorage if storageKey prop provided", () => {
        const localStorageEmulator = {};
        (window as any).localStorage = {
            setItem: (key: string, newValue: any) => {
                localStorageEmulator[key] = newValue;
            }
        };
        const changedPassword = (Math.random().toString() as any).repeat(10);
        const storageKey = "form";
        wrapper.setProps({ storageKey });
        node.getChildContext().onChange("password", changedPassword);
        wrapper.unmount();
        expect(localStorageEmulator).to.have.key(storageKey);
        const storedForm = JSON.parse(localStorageEmulator[storageKey]);
        expect(storedForm).to.have.property("password");
        expect(storedForm.password).to.be.equal(changedPassword);
    });

    it("Should have load values from localStorage if storageKey prop provided", () => {
        const storedForm = {
            password: (Math.random().toString() as any).repeat(2),
            email: "person@example.com",
        };
        const storedFormName = "storedForm";
        (window as any).localStorage = {
            setItem: () => undefined,
            getItem: (key: string) => key === storedFormName && JSON.stringify(storedForm),
        };
        wrapper.setProps({ storageKey: storedFormName });
        wrapper.unmount();
        wrapper.mount();

        // Can not emulate onMount (componentWillMount wont be called)
        (wrapper.instance() as Form<ExampleModel>).loadFromStorage();
        expect(wrapper.state().model.password).to.be.equal(storedForm.password);
        expect(wrapper.state().model.email).to.be.equal(storedForm.email);
    });

    it("Should return false on loadFromStorage is local storage is empty (0)", () => {
        (window as any).localStorage = { getItem: () => 0 };
        expect((wrapper.instance() as Form<ExampleModel>).loadFromStorage()).to.be.false;
    });

    it("Should return false on loadFromStorage on JSON.parse exception", () => {
        (window as any).localStorage = { getItem: () => "" };
        expect((wrapper.instance() as Form<ExampleModel>).loadFromStorage()).to.be.false;
    });

    it("Should add error and call forceUpdate", () => {
        const error = { attribute: "email", details: "Some error" };
        node.getChildContext().addError(error);
        expect((node.forceUpdate as SinonSpy).calledOnce).to.be.true;
        expect(wrapper.state().model.getError(error.attribute).details).to.equal(error.details);
    });

    it("Should preventDefault when event pass to function", () => {
        let isDefaultPrevented = false;
        wrapper.simulate("submit", {
            preventDefault: () => {
                isDefaultPrevented = true;
            }
        });
        expect(isDefaultPrevented).to.be.true;
    });

    it("Should call `props.onSubmit` when form has been validated", async () => {
        await node.handleSubmit();
        expect(wrapper.state().model.hasErrors()).to.be.false;
        expect(isOnSubmitTriggered).to.be.true;
    });

    it("Should remove errors from field ", async () => {
        model.email = "wrong";
        wrapper.update();
        await node.getChildContext().validate("email");
        expect((wrapper.state().model.removeErrors as SinonSpy).called).to.be.true;
    });

    it("Should not call `props.onSubmit` if prop `method` passed to form", async () => {
        props.method = "post";
        wrapper.setProps(props);
        await node.handleSubmit();
        expect(wrapper.state().model.hasErrors()).to.be.false;
        expect(isOnSubmitTriggered).to.be.false;
    });

    it("Should set element focused if it has error onSubmit", async () => {
        const attribute = "email";
        model[attribute] = "wrong";
        wrapper.update();
        let isFocused = false;
        node.state.mounted[attribute].onfocus = () => isFocused = true;
        await node.handleSubmit();
        expect(isFocused).to.be.true;
    });

    it("Should set satate `isLoading` to false when `onSubmit` from props throw error", async () => {
        const handleSubmit = () => {
            throw Error();
        }

        wrapper = mount(
            <ExampleForm {...props} onSubmit={handleSubmit}>
                <FormGroup name="email">
                    <Input />
                </FormGroup>
            </ExampleForm>
        );

        try {
            await (wrapper.instance() as any).handleSubmit();
        } catch (error) {
            expect(wrapper.state().isLoading).to.be.false;
        }

    });

    it("Should reset form after submit when `resetAfterSubmit` property is set", async () => {
        wrapper = mount(
            <ExampleForm {...props} resetAfterSubmit>
                <FormGroup name="email">
                    <Input />
                </FormGroup>
            </ExampleForm>
        );
        let isResetCalled = false;
        model.reset = () => {
            isResetCalled = true;
        };
        await (wrapper.instance() as any).handleSubmit();

        expect(isResetCalled).to.equal(true);
    })
});
