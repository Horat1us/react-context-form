import * as React from "react";
import {Input} from "../Input/Input";
import {PatternInputProps, PatternInputPropTypes} from "./PatternInputProps";

export class PatternInput extends React.Component<PatternInputProps> {
    public static propTypes = PatternInputPropTypes;

    public render(): JSX.Element {
        return <Input onChange={this.handleChange}/>;
    }

    protected handleChange = (event: any) => {
        Array.isArray(this.props.patterns)
            ? this.handleArrayPattern(event)
            : this.handleSinglePattern(event);
    };

    protected handleSinglePattern = (event: any) => {
        if (!event.target.value.match(this.props.patterns)) {
            return;
        }

    };

    protected handleArrayPattern = (event: any) => {
        let endOfStringReached = false;
        /* Variable for storing target pattern. */
        /* After each loop iteration this pattern will be concatenated with used pattern. */
        let targetPattern = /^/;
        const patterns: Array<string|RegExp> = this.props.patterns;
        const {value} = event.target;

        for (const pattern of patterns) {

            if (!(pattern instanceof RegExp)) {
                /* Save current pattern, because it will be updated. */
                const prevPattern = targetPattern;
                /* Update target pattern using passed string. */
                targetPattern = new RegExp(targetPattern.source + pattern);

                /* If passed string was ignored, add it to the target value. */
                if (!value.match(targetPattern) && !(`${value}${pattern}`).match(targetPattern)) {
                    /* Get string that satisfies the prev pattern. */
                    const match = value.match(prevPattern);
                    const {length} = match[0];
                    /* Insert passed string on position that equals to length of matched string. */
                    event.target.value = `${value.slice(0, length)}${pattern}${value.slice(length)}`;
                    break;
                }

                /* If value can be concatenated, then there is no more characters in target value. */
                /* Add passed string and call onChange. */
                if (endOfStringReached) {
                    event.target.value += pattern;
                    break;
                }

                /* If user decided to erase text, check, if this string is last in target value.*/
                /* If so, remove it from target value and call onChange. */
                if (value.match(new RegExp(targetPattern.source + "$"))) {
                    event.target.value = value.match(prevPattern)[0];
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
    };
}
