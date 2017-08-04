import * as React from 'react';

export interface FormGroupProps extends React.HTMLProps<HTMLDivElement> {
    children: any,
}

export default class FormGroup extends React.Component<FormGroupProps, undefined> {
    static defaultProps = {
        className: 'form-group',
    };

    render() {
        const {...childProps} = this.props;

        return <div {...childProps}>
            {this.props.children}
        </div>
    }
}