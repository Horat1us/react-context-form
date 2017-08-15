import * as React from 'react';

import {expect} from 'chai';
import {mount, shallow} from 'enzyme';

import {SubmitButton} from '../src/SubmitButton';
import {SubmitButtonContext} from "../src/SubmitButton/SubmitButtonContext";

describe("<SubmitButton />", () => {
    const Child = () => <span>Child</span>;

    class Loading extends React.Component<any, any> {
        render() {
            return <span>Loading</span>;
        }
    }

    let wrapper;
    beforeEach(() => {
        const context: SubmitButtonContext = {
            isLoading: false,
        };
        wrapper = mount(<SubmitButton loadingComponent={<Loading/>}>
            <Child/>
        </SubmitButton>, {context});
    });

    it('should render `props.children` when not `context.isLoading`', () => {
        wrapper.setContext({
            isLoading: false,
        });
        expect(wrapper.contains(<Child/>)).to.be.true;
    });

    it('should render `props.loadingComponent` instead of child when `context.isLoading`', () => {
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

    it('should add `width` attribute (saved with children) when `context.isLoading`', () => {
        const node: HTMLButtonElement = wrapper.getDOMNode();
        let widthWithChildren = node.offsetWidth.toString();
        wrapper.setContext({
            isLoading: true,
        });
        expect(wrapper.getDOMNode().getAttribute('width')).to.be.equal(widthWithChildren);
    });
});