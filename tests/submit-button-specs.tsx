import * as React from 'react';

import {expect} from 'chai';
import {shallow} from 'enzyme';

import {SubmitButton} from '../src/SubmitButton';

describe("Submit Button", () => {
    const Child = () => <span>Child</span>;

    class Loading extends React.Component<any, any> {
        render() {
            return <span>Loading</span>;
        }
    }

    let wrapper;
    beforeEach(() => {
        const context = {
            isLoading: false,
        };
        wrapper = shallow(<SubmitButton loadingComponent={<Loading/>}>
            <Child/>
        </SubmitButton>, {context});
    });

    it('should render child when not loading', () => {
        wrapper.setContext({
            isLoading: false,
        });
        expect(wrapper.contains(<Child/>)).to.be.true;
    });

    it('should render loading instead of child when `context.isLoading`', () => {
        wrapper.setContext({
            isLoading: true,
        });
        expect(wrapper.contains(<Child/>)).to.be.false;
        expect(wrapper.contains(<Loading/>)).to.be.true;
    });

    it('should add `is-loading` className when `context.isLoading`', () => {
        wrapper.setContext({
            isLoading: true,
        });
        expect(wrapper.hasClass('is-loading')).to.be.true;
    });
});