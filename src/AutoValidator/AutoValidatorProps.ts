import * as PropTypes from "prop-types";

export interface AutoValidatorProps {
    groupName: string,
    children: JSX.Element,

    onBlur: boolean,
    onLength?: number,

    onValidated: (isValid: boolean) => void,
}

export const AutoValidatorPropTypes = {
    groupName: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,

    onBlur: PropTypes.bool.isRequired,
    onLength: PropTypes.number,

    onValidated: PropTypes.func,
};

export const AutoValidatorDefaultProps = {
    onBlur: true,
    onValidated: () => undefined,
};
