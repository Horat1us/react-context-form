import {Model} from "../../src/Model/Model";
import {IsAlphanumeric, IsDefined, IsEmail, MinLength} from "class-validator";

export class ExampleModel extends Model {
    @MinLength(10)
    @IsAlphanumeric()
    public password: string;

    @IsEmail()
    @IsDefined()
    public email: string;

    public attributes() {
        return ["password", "email"];
    }
}
