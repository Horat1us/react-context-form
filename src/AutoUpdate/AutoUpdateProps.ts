export interface AutoUpdateProps {
    value: (value: any) => any,
    attribute: string,
    children: JSX.Element,
    onBlur?: boolean,
    onChange?: boolean,
}

export const AutoUpdateDefaultProps = {
    onBlur: true,
    onChange: false,
};
