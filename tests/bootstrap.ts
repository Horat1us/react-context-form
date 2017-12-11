import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme';

if ("performance" in window === false) {
    (window as any).performance = {
        now: () => Date.now(),
    };
}

chai.use(chaiEnzyme());