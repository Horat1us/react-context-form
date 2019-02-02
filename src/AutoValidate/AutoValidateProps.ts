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

export const AutoValidateDefaultProps: {[P in keyof AutoValidateProps]?: AutoValidateProps[P]} = {
    onBlur: true,
    onChange: false,
    always: false,
    onValidated: () => undefined,
};
