import {Model} from "../Model";

export interface FormProps<M extends Model> {
    instantiate: () => M,
}