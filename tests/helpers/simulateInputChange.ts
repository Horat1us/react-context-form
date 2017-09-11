import * as React from "react";
import {ReactWrapper} from "enzyme";

export function simulateInputChange(wrapper: ReactWrapper<React.HTMLProps<HTMLInputElement>, any>,
                                    value: string = "") {

    const inputWrapper = wrapper.find("input");
    const input = inputWrapper.getDOMNode() as HTMLInputElement;
    input.value = "";
    inputWrapper.simulate("change");

    for (const char of value) {
        input.value += char;
        inputWrapper.simulate("change");
    }
}
