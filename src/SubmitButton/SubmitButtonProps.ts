import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface SubmitButtonProps extends React.HTMLProps<HTMLButtonElement> {
    loadingComponent: JSX.Element,
}

export const SubmitButtonPropTypes = {
    loadingComponent: PropTypes.element.isRequired,
};

export const SubmitButtonDefaultProps = {
    type: 'submit',
};