import * as React from 'react';

export const Child = () => <span>Child</span>;

export class Loading extends React.Component<any, any> {
    render() {
        return <span>Loading</span>;
    }
}