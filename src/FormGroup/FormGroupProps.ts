import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface FormGroupProps extends React.HTMLProps<HTMLDivElement> {
    name: string,
    component: typeof React.Component | ((props: any) => JSX.Element),
}

export const FormGroupPropTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
};

export const FormGroupDefaultProps = {
    className: 'form-group',
};