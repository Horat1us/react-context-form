import * as React from 'react';
import * as PropTypes from 'prop-types';

export type FormGroupInput = React.Component<any, any>;
export type FormGroupChildren = ((props: any) => JSX.Element) | FormGroupInput;

export interface FormGroupProps {
    name: string,
    component: FormGroupChildren,
}

export const FormGroupPropTypes = {
    name: PropTypes.string.isRequired,
};