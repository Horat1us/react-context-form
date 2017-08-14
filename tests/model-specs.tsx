import {expect} from 'chai';
import {ExampleModel} from "./helpers/ExampleModel";

describe("Model", () => {
    let model: ExampleModel;
    beforeEach(() => {
        model = new ExampleModel();
    });

    describe("Values", () => {
        it('Should return all available values', () => {
            model.email = 'some@example.com';
            model.password = 'Qwerty123';
            const values = model.values;
            expect(values).to.have.length(2);
        });

        it("Should not give empty values", () => {
            model.email = "some@example.com";
            const values = model.values;
            expect(values).to.have.length(1);
        });

        it('Should return undefined for not set values', () => {
            expect(model.getValue('email')).to.be.undefined;
        });
    });

    describe("Validation", () => {
        it("Should generate error", async () => {
            model.password = 'weak';
            const errors = await model.validate();
            expect(errors).to.have.length(2);
        });

        it("Should not generate errors for not require errors", async () => {
            model.email = "some@example.com";
            const errors = await model.validate();
            expect(errors).to.be.empty;
        });

        it('Should generate errors for required errors', async () => {
            const errors = await model.validate();
            expect(errors).to.have.length(1);
            expect(errors[0].attribute).to.be.equal('email');
        });
    });
});