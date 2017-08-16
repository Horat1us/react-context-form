import * as React from 'react';

import {expect} from 'chai';
import {mount} from 'enzyme';

import {useFakeTimers, SinonFakeTimers} from 'sinon';

import {SlowSubmitButton} from '../src/SlowSubmitButton';
import {Child, Loading} from './helpers/CommonComponents';

describe('<SlowSubmitButton />', () => {
    let wrapper;
    let timer: SinonFakeTimers;
    const duration = 500;
    const step = 100;

    beforeEach(() => {
        const context = {
            isLoading: false,
        };
        wrapper = mount(<SlowSubmitButton loadingComponent={<Loading/>} duration={duration}>
            <Child/>
        </SlowSubmitButton>, {context});

        timer = useFakeTimers();
    });

    afterEach(() => {
        timer.restore();
    });

    it('should show <Child/> by default (context.isLoading = false)', () => {
        expect(wrapper.contains(<Child/>)).to.be.true;
        expect(wrapper.contains(<Loading/>)).to.be.false;
    });

    it('should show <Loading/> when context switched (context.isLoading = true)', () => {
        wrapper.setContext({
            isLoading: true,
        });

        expect(wrapper.contains(<Child/>)).to.be.false;
        expect(wrapper.contains(<Loading/>)).to.be.true;
    });

    it('Should not show <Child/> after changing context (context.isLoading = false)', () => {
        wrapper.setContext({
            isLoading: true,
        });
        wrapper.setContext({
            isLoading: false,
        });
        expect(wrapper.contains(<Child/>)).to.be.false;
        expect(wrapper.contains(<Loading/>)).to.be.true;
    });

    it('should show <Child /> after chanding context (isLoading = true) and after duration', () => {
        wrapper.setContext({
            isLoading: true,
        });
        wrapper.setContext({
            isLoading: false,
        });

        timer.tick(duration);
        expect(wrapper.contains(<Child/>)).to.be.true;
        expect(wrapper.contains(<Loading/>)).to.be.false;
    });
});