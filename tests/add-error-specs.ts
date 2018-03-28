import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";

import { addError, Form } from "../src";
import { ExampleModel } from "./helpers/ExampleModel";

describe("addError()", () => {

    const context = new Form({
        instantiate: () => new ExampleModel()
    }).getChildContext();

    it("Should add error if status equals 400", () => {
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
        };

        addError(context, error);
        expect(context.getError("email").details).to.equal("exist");
        expect(context.getError("password").details).to.equal("exist");
    });

    it("Should throw error if status not equals 400", () => {
        const error = "error))"

        expect(() => addError(context, error)).to.throw(error);

    });
});
