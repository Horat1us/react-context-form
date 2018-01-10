import { expect } from "chai";

import { ExampleModel } from "./helpers/ExampleModel";
import { EmptyeModel } from "./helpers/EmptyModel";

describe("Model", () => {
    let model: ExampleModel;
    let emptyModel: EmptyeModel;
    const modelPropertiesCount = 2;
    beforeEach(() => {
        model = new ExampleModel();
        emptyModel = new EmptyeModel();
    });

    describe("Values", () => {
        it("Should return all available values", () => {
            model.email = "some@example.com";
            model.password = "Qwerty123";
            const values = model.values;
            expect(values).to.have.length(modelPropertiesCount);
        });

        it("Should give empty values both with filled", () => {
            model.email = "some@example.com";
            const values = model.values;
            const exampleModelAttributesCount = 2;
            expect(values).to.have.length(exampleModelAttributesCount);
        });

        it("Should not return undefined for not set values", () => {
            expect(model.getValue("email")).to.be.not.undefined;
        });

        it("Should represent errors as string", async () => {
            model.email = "some@example.com";
            model.password = "No-";
            await model.validate();
            const value = model.getValue("password");
            expect(value).to.have.property("error");
            expect(value.error).to.be.equal(
                "password must contain only letters and numbers," +
                " password must be longer than or equal to 10 characters"
            );
        });

        it("Should return all attributes", () => {
            expect(model.attributes().length).to.equal(modelPropertiesCount);
            expect(model.attributes()).to.contain("password");
            expect(model.attributes()).to.contain("email");
        });

        it("Should return all groups", () => {
            expect(Object.keys(model.groups()).length).to.equal(modelPropertiesCount);

            expect(Object.keys(model.groups())).to.contain("password");
            expect(Object.keys(model.groups())).to.contain("email");
        });
    });

    describe("attributes and groups", () => {
        it("Should return empty group list", () => {
            expect(Object.keys(emptyModel.groups()).length).to.equal(0);
        });

        it("Should return Model public fields list", () => {
            emptyModel.attributes().forEach((field) => {
                expect(emptyModel[field]).to.exist;
                expect(typeof emptyModel[field]).to.equal("function");
            });
        });
    });

    describe("Validation", () => {
        it("Should generate error", async () => {
            model.password = "weak";
            const errors = await model.validate();
            expect(errors).to.have.length(modelPropertiesCount);
        });

        it("Should not generate errors for not require errors", async () => {
            model.email = "some@example.com";
            const errors = await model.validate();
            expect(errors).to.be.empty;
        });

        it("Should generate errors for required errors", async () => {
            const errors = await model.validate();
            expect(errors).to.have.length(modelPropertiesCount - 1);
            expect(errors[0].attribute).to.be.equal("email");
        });

        it("Should keep old errors when group validation", async () => {
            model.email = "someexample.com";
            let errors = await model.validate();

            expect(errors).to.have.length(1);
            expect(errors[0].attribute).to.be.equal("email");

            model.password = "week";
            errors = await model.validate("password");
            expect(errors).to.have.length(1);
            expect(errors[0].attribute).to.be.equal("password");
        });
    });

    describe("errors", () => {
        it("Should return error if it present in errors array", () => {
            expect(model.getError("email")).to.not.exist;

            const errorMsg = "error details";

            model.addError({
                attribute: "email",
                details: errorMsg
            });

            expect(model.getError("email").details).to.equal(errorMsg);
        });

        it("Should add errors", () => {
            const errorMsg = "error details";

            model.addError({
                attribute: "email",
                details: errorMsg
            });

            expect(model.getError("email")).to.exist;
            expect(model.getError("email").details).to.equal(errorMsg);
        });

        it("Should remove errors from errors array", () => {
            const errorMsg = "error details";

            model.addError({
                attribute: "email",
                details: errorMsg
            });

            expect(model.getError("email")).to.exist;
            expect(model.getError("email").details).to.equal(errorMsg);

            model.removeErrors("email");

            expect(model.getError("email")).to.not.exist;
        });

        it("Should return true if errors exist in errors array", () => {
            expect(model.hasErrors()).to.be.false;

            const errorMsg = "error details";

            model.addError({
                attribute: "email",
                details: errorMsg
            });

            expect(model.hasErrors()).to.be.true
        });

        it("Should return true if group error exist in errors array", () => {
            expect(model.getError("email")).to.not.exist;

            const errorMsg = "error details";

            model.addError({
                attribute: "email",
                details: errorMsg
            });

            expect(model.getError("email")).to.exist;
        });

        it("Should return all errors", () => {
            expect(model.getError("email")).to.not.exist;

            const errorMsg = "error details";

            model.addError({
                attribute: "email",
                details: errorMsg
            });

            model.addError({
                attribute: "password",
                details: errorMsg
            });

            expect(model.getErrors()[0].attribute).to.equal("email");
            expect(model.getErrors()[1].attribute).to.equal("password");
        });
    });
});
