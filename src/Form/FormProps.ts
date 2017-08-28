import * as React from "react";
import {ModelInterface} from "../Model/ModelInterface";

export interface FormProps<M extends ModelInterface> {
    instantiate: () => M;
}
