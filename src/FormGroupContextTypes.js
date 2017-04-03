import React from 'react';

const FormGroupContextTypes = {
    errors: React.PropTypes.objectOf(
        React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(
                React.PropTypes.string
            ),
            React.PropTypes.string,
        ]),
    ),
    labels: React.PropTypes.objectOf(
        React.PropTypes.string
    ),
};

export default FormGroupContextTypes; 