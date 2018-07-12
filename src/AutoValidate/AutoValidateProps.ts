import * as PropTypes from "prop-types";

export interface AutoValidateProps {
    groupName?: string,
    children: JSX.Element,

    onBlur?: boolean,
    onChange?: boolean,
    onLength?: number,
    always?: boolean

    onValidated?: (isValid: boolean) => void,

    on?: (nextValue: string, previousValue: string) => boolean
}

export const AutoValidatePropTypes: {[P in keyof AutoValidateProps]: PropTypes.Validator<any>} = {
    children: PropTypes.element.isRequired,
    groupName: PropTypes.string,

    onBlur: PropTypes.bool,
    onChange: PropTypes.bool,
    onLength: PropTypes.number,
    always: PropTypes.bool,
    onValidated: PropTypes.func,

    on: PropTypes.func
};

export const AutoValidateDefaultProps: {[P in keyof AutoValidateProps]?: AutoValidateProps[P]} = {
    onBlur: true,
    onChange: false,
    always: false,
    onValidated: () => undefined,
};
