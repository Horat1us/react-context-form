import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

if ("performance" in window === false) {
    (window as any).performance = {
        now: () => Date.now(),
    };
}

Enzyme.configure({ adapter: new Adapter() });
