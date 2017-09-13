import {expect} from "chai";
import {ExampleModel} from "./helpers/ExampleModel";

describe("Model", () => {
    let model: ExampleModel;
    const modelPropertiesCount = 2;
    beforeEach(() => {
        model = new ExampleModel();
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

        it("Should return all attributes", async () => {
            expect(model.attributes().length).to.equal(modelPropertiesCount);
            expect(model.attributes()).to.contain("password");
            expect(model.attributes()).to.contain("email");
        });

        it("Should return all groups", async () => {
            expect(Object.keys(model.groups()).length).to.equal(modelPropertiesCount);

            expect(Object.keys(model.groups())).to.contain("password");
            expect(Object.keys(model.groups())).to.contain("email");
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
            model.password = "weak";

            const errors = await model.validate("email");

            expect(errors).to.have.length(modelPropertiesCount);
            expect(errors[1].attribute).to.be.equal("email");
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

        it("Should add errors", async () => {
            const errorMsg = "error details";

            model.addError({
                attribute: "email",
                details: errorMsg
            });

            expect(model.getError("email")).to.exist;
            expect(model.getError("email").details).to.equal(errorMsg);
        });

        it("Should remove errors from errors array", async () => {
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

        it("Should return true if errors exist in errors array", async () => {
            expect(model.hasErrors()).to.be.false;

            const errorMsg = "error details";

            model.addError({
                attribute: "email",
                details: errorMsg
            });

            expect(model.hasErrors()).to.be.true
        });
    });
});
