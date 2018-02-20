import * as PropTypes from "prop-types";

export interface PasswordGroupContext {
    onChangeVisibility?: (state?: boolean) => () => void;     
    isHidden?: boolean;
}

export const PasswordGroupContextTypes: {[P in keyof PasswordGroupContext]: PropTypes.Validator<any>} = {
    onChangeVisibility: PropTypes.func,
    isHidden: PropTypes.bool
};
