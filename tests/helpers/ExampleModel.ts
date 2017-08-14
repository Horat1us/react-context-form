import {Model} from "../../src/Model/Model";
import {IsDefined, IsEmail, MinLength} from "class-validator";

export class ExampleModel extends Model {
    @MinLength(10)
    public password: string;

    @IsEmail()
    @IsDefined()
    public email: string;
}