import * as React from "react";
import * as PropTypes from "prop-types";
import {Input} from "../Input/Input";
import {MultiplePatternInputProps, MultiplePatternInputPropTypes} from "./MultiplePatternInputProps";
import {InputContext, InputContextTypes} from "../Input/InputContext";
import {MultiplePatternInputContext, MultiplePatternInputContextTypes} from "./MultiplePatternInputContext";

export class MultiplePatternInput extends React.Component<MultiplePatternInputProps> {
    public static propTypes = MultiplePatternInputPropTypes;
    public static childContextTypes = MultiplePatternInputContextTypes;
    public static contextTypes = InputContextTypes;
    public context: InputContext;

    public escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }

    public getChildContext(): MultiplePatternInputContext {
        return {
            onChange: this.handleChange,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
        };
    }

    public render(): JSX.Element {
        return <Input/>;
    }

    protected handleChange = (value: string) => {
        let endOfStringReached = false;
        /* Variable for storing target pattern. */
        /* After each loop iteration this pattern will be concatenated with used pattern. */
        let targetPattern = /^/;
        const patterns: Array<string | RegExp> = this.props.patterns;

        for (const pattern of patterns) {

            if (!(pattern instanceof RegExp)) {
                /* Save current pattern, because it will be updated. */
                const prevPattern = targetPattern;
                /* Update target pattern using passed string. */
                targetPattern = new RegExp(targetPattern.source + this.escapeRegExp(pattern));

                /* If passed string was ignored, add it to the target value. */
                if (!value.match(targetPattern) && !(`${value}${pattern}`).match(targetPattern)) {
                    /* Get string that satisfies the prev pattern. */
                    const match = value.match(prevPattern);
                    const {length} = match[0];
                    /* Insert passed string on position that equals to length of matched string. */
                    value = value.slice(0, length) + pattern + value.slice(length);
                    continue;
                }

                /* If value can be concatenated, then there is no more characters in target value. */
                /* Add passed string and call onChange. */
                if (endOfStringReached) {
                    value += pattern;
                    break;
                }

                /* If user decided to erase text, check, if this string is last in target value.*/
                /* If so, remove it from target value and call onChange. */
                if (value.match(new RegExp(targetPattern.source + "$"))) {
                    value = value.match(prevPattern)[0];
                    break;
                }
                continue;
            }

            /* Update target pattern with current pattern. */
            targetPattern = new RegExp(targetPattern.source + pattern.source);

            /* Ignore invalid value and end of patterns. */
            if (!value.match(targetPattern) || endOfStringReached) {
                return;
            }

            /* Check if target value matches pattern totally. */
            if (value.match(new RegExp(targetPattern.source + "$"))) {
                /* If so, passed strings can be added to*/
                endOfStringReached = true;
            }
        }

        this.context.onChange(value);
    };

    protected handleFocus = () => {
        if (
            this.props.patterns[0] instanceof RegExp
            || this.context.value !== ""
        ) {
            return;
        }

        this.context.onChange(this.props.patterns[0].toString());
        this.context.onFocus();
    };

    protected handleBlur = () => {
        if (
            this.props.patterns[0] instanceof RegExp
            || this.context.value !== this.props.patterns[0]
        ) {
            return;
        }

        this.context.onChange("");
        this.context.onBlur();
    };
}
