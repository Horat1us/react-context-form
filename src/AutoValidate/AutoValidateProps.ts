import * as PropTypes from "prop-types";

export interface AutoValidateProps {
    groupName: string,
    children: JSX.Element,

    onBlur?: boolean,
    onChange?: boolean,
    onLength?: number,
    always?: boolean

    onValidated?: (isValid: boolean) => void,

    on?: (nextValue: string) => boolean
}

export const AutoValidatePropTypes = {
    groupName: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,

    onBlur: PropTypes.bool,
    onChange: PropTypes.bool,
    onLength: PropTypes.number,
    always: PropTypes.bool,
    onValidated: PropTypes.func,

    on: PropTypes.func
};

export const AutoValidateDefaultProps = {
    onBlur: true,
    onChange: false,
    always: false,
    onValidated: () => undefined,
};
