import { SubmitButtonProps, SubmitButtonDefaultProps } from "../SubmitButton";

export interface SlowSubmitButtonProps extends SubmitButtonProps {
    duration?: number,
}

export const SlowSubmitButtonDefaultProps: {[P in keyof SlowSubmitButtonProps]?: SlowSubmitButtonProps[P]} = {
    ...SubmitButtonDefaultProps,
    duration: 500
};
