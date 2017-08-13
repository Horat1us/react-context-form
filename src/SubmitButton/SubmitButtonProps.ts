import PropTypes from 'prop-types';
import React from 'react';

export const SubmitButtonPropTypes = {
    loadingComponent: PropTypes.element.isRequired,
};

export const SubmitButtonDefaultProps = {
    type: 'submit',
};

export interface SubmitButtonProps extends React.HTMLProps<HTMLButtonElement> {
    loadingComponent: React.Component,
}