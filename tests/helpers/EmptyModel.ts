import {Model} from "../../src/Model/Model";

export class EmptyeModel extends Model {
    public field: any;

    public attributes() {
        return [
            "field"
        ]
    }
}
