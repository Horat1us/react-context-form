import * as React from "react";
import * as PropTypes from "prop-types";
import {Input} from "../Input/Input";
import {MultiplePatternInputProps, MultiplePatternInputPropTypes} from "./MultiplePatternInputProps";
import {InputContext, InputContextTypes} from "../Input/InputContext";
import {MultiplePatternInputContext, MultiplePatternInputContextTypes} from "./MultiplePatternInputContext";
import {Pattern} from "./Pattern";

export class MultiplePatternInput extends React.Component<MultiplePatternInputProps> {
    public static propTypes = MultiplePatternInputPropTypes;
    public static childContextTypes = MultiplePatternInputContextTypes;
    public static contextTypes = InputContextTypes;
    public context: InputContext;

    protected input: HTMLInputElement;

    public escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }

    public get patternsLength() {
        return this.props.patterns
            .reduce((carry, current) => {
                return carry + current.length;
            }, 0);
    }

    public get patternsGroup() {
        return new RegExp(
            "["
            + this.props.patterns
                .filter((pattern) => pattern instanceof Pattern)
                .reduce((carry: string, current: Pattern) => {
                    return carry + current.regex.source;
                }, "")
            + "]"
        );
    }

    public getChildContext(): MultiplePatternInputContext {
        return {
            onChange: this.handleChange,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onMount: this.handleMount,
        };
    }

    public render(): JSX.Element {
        return <Input/>;
    }

    protected handleMount = async (ref: HTMLElement) => {
        this.input = ref as HTMLInputElement;
        await this.context.onMount(ref);
    };

    protected handleChange = async (sourceValue: string) => {
        if (sourceValue === "") {
            return;
        }

        const value = this.clearValue(sourceValue);
        let targetValue = "";

        for (const char of value || [""]) {
            const result = this.process(targetValue + char, sourceValue);
            if (result === false) {
                continue;
            }
            targetValue = result;
        }

        const cursorPosition = this.getCursorPosition(targetValue);

        await this.context.onChange(targetValue.substr(0, this.patternsLength));

        if (this.input) {
            this.input.setSelectionRange(cursorPosition, cursorPosition);
        }
    };

    protected process = (value: string, sourceValue: string) => {
        let targetPattern = /^/;
        let endOfStringReached = false;

        const patterns: Array<string | Pattern> = this.props.patterns;

        for (const pattern of patterns) {
            if (!(pattern instanceof Pattern)) {
                if (value === "") {
                    return pattern;
                }

                const prevPattern = targetPattern;
                /* Update target pattern using passed string. */
                targetPattern = new RegExp(targetPattern.source + this.escapeRegExp(pattern));

                /* If value can be concatenated, then there is no more characters in target value. */
                /* Add passed string and call onChange. */
                if (endOfStringReached) {
                    if (
                        sourceValue.length < this.context.value.length
                        && this.context.value.endsWith(pattern)
                    ) {
                        return sourceValue.substr(0, this.context.value.length - pattern.length - 1);
                    }
                    return value + pattern;
                }
                /* If passed string was ignored, add it to the target value. */
                if (!value.match(targetPattern) && !(`${value}${pattern}`).match(targetPattern)) {
                    /* Get string that satisfies the prev pattern. */
                    const match = value.match(prevPattern);
                    const {length} = match[0];
                    /* Insert passed string on position that equals to length of matched string. */
                    value = value.slice(0, length) + pattern + value.slice(length);
                }

                continue;
            }

            for (let i = 1; i <= pattern.length; i++) {
                if (endOfStringReached) {
                    return value;
                }

                targetPattern = new RegExp(targetPattern.source + pattern.regex.source);
                if (!value.match(targetPattern)) {
                    return false;
                }

                if (value.match(new RegExp(targetPattern.source + "$"))) {
                    endOfStringReached = true;
                }
            }
        }

        return value;
    };

    protected getCursorPosition = (value: string): number => {
        const currentLength = this.context.value.length;

        let start: any = false;

        for (let i = 0; i < currentLength; i++) {
            if (value[i] !== this.context.value[i]) {
                start = i;
                break;
            }
        }
        const maxLength = Math.max(currentLength, value.length);
        if (start === false) {
            return maxLength;
        }

        let count = 1;
        if (value.length < currentLength) {
            return start;
        }

        while (
            (value[start + count] !== this.context.value[start])
            && (start + count < maxLength)
        ) {
            count++;
        }
        return start + count;
    };

    protected clearValue = (value: string) => {
        for (const pattern of this.props.patterns) {
            if (pattern instanceof Pattern) {
                continue;
            }

            for (const char of pattern) {
                const patternIndex = value.indexOf(char);
                if (patternIndex === -1) {
                    break;
                }
                value = value.substr(0, patternIndex) + value.substr(patternIndex + 1);
            }
        }
        return value;
    };

    protected handleFocus = async () => {
        if (
            this.props.patterns[0] instanceof Pattern
            || !!this.context.value
        ) {
            return;
        }

        await this.context.onChange(this.props.patterns[0].toString());
    };

    protected handleBlur = async () => {
        if (
            this.props.patterns[0] instanceof Pattern
            || this.context.value !== this.props.patterns[0]
        ) {
            return;
        }

        await this.context.onChange("");
    };
}
