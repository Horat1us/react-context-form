import * as React from 'react';

export class Input extends React.Component<React.HTMLProps<HTMLInputElement>> {
    render() {
        return <input {...this.props}/>
    }
}