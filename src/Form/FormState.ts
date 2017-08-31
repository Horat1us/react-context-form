import {ModelInterface} from "../Model/ModelInterface";

export interface FormState<M> {
    model: M,
    mounted: {
        [key: string]: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    },
    isLoading: boolean,
}
