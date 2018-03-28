import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";

import { addError, Form } from "../src";
import { ExampleModel } from "./helpers/ExampleModel";
import { AxiosError } from "axios";

describe("addError()", () => {

    const context = new Form({
        instantiate: () => new ExampleModel()
    }).getChildContext();

    it("Should add error if passed error valid", () => {
        const error = {
            response: {
                data: {
                    errors: [
                        {
                            attribute: "email",
                            details: "exist"
                        },
                        {
                            attribute: "password",
                            details: "exist"
                        }
                    ]
                },
                status: 400
            }
        } as AxiosError;

        addError(context, error);
        expect(context.getError("email").details).to.equal("exist");
        expect(context.getError("password").details).to.equal("exist");
    });

    it("Should throw error if errors array is not valid", () => {
        const error = {
            response: {
                data: {
                    errors: [
                        {
                            attributeNotValid: "email",
                            details: "exist"
                        },
                        {
                            attribute: "password",
                            detailsNotValid: "exist"
                        }
                    ]
                },
                status: 400
            }
        } as AxiosError;

        try {
            addError(context, error)
        } catch(error) {
            expect(error).to.equal(error);
        }
    });

    it("Should throw error when passed error not valid", () => {
        let error = {
            withoutResponse: "",
        } as any;
        try {
            addError(context, error)
        } catch(error) {
            expect(error).to.equal(error);
        }

        error = {
            response: {
                status: 500
            }
        } as any;
        try {
            addError(context, error)
        } catch(error) {
            expect(error).to.equal(error);
        }

        error = {
            response: {
                status: 400,
                data: undefined
            }
        } as any;
        try {
            addError(context, error)
        } catch(error) {
            expect(error).to.equal(error);
        }

        error = {
            response: {
                status: 400,
                data: {
                    errors: {}
                }
            }
        } as any;
        try {
            addError(context, error)
        } catch(error) {
            expect(error).to.equal(error);
        }
    });
});
