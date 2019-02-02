import * as React from "react";

import { FormGroupContext, FormGroupContextValue } from "../FormGroup";

export const Label = React.memo((props: React.HTMLProps<HTMLLabelElement>) => (
    <FormGroupContext.Consumer>
        {(context: FormGroupContextValue) => <label {...props} htmlFor={context.id} />}
    </FormGroupContext.Consumer>
));
