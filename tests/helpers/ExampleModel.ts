import {Model} from "../../src/Model/Model";
import {IsAlphanumeric, IsDefined, IsEmail, MinLength} from "class-validator";

export class ExampleModel extends Model {
    @MinLength(10, {
        groups: ["password"],
    })
    @IsAlphanumeric({
        groups: ["password"],
    })
    public password: string;

    @IsEmail({}, {
        groups: ["email"],
    })
    @IsDefined({
        groups: ["email"],
    })
    public email: string;

    public attributes() {
        return ["password", "email"];
    }

    public groups() {
        return {
            email: ["email"],
            password: ["password"]
        }
    }

    public post = () => undefined;
}
