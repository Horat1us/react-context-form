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

    it('should correctly show content and loading in case of context', () => {
        expect(wrapper.contains(<Child/>)).to.be.true;
        expect(wrapper.contains(<Loading/>)).to.be.false;

        wrapper.setContext({
            isLoading: true,
        });

        expect(wrapper.contains(<Child/>)).to.be.false;
        expect(wrapper.contains(<Loading/>)).to.be.true;

        timer.tick(duration);

        wrapper.setContext({
            isLoading: false,
        });
        expect(wrapper.contains(<Child/>)).to.be.true;
        expect(wrapper.contains(<Loading/>)).to.be.false;
    });

    it('should remain loading after fast changing context', () => {
        wrapper.setContext({
            isLoading: true,
        });
        timer.tick(step);
        expect(wrapper.contains(<Child/>)).to.be.false;
        expect(wrapper.contains(<Loading/>)).to.be.true;
        wrapper.setContext({
            isLoading: false,
        });

        timer.tick(step);
        expect(wrapper.contains(<Child/>)).to.be.false;
        expect(wrapper.contains(<Loading/>)).to.be.true;

        timer.tick(duration - step * 2);
        expect(wrapper.contains(<Child/>)).to.be.true;
        expect(wrapper.contains(<Loading/>)).to.be.false;
    });
});