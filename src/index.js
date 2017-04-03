/**
 * Created by horat1us on 05.03.17.
 */
import React, {Component} from 'react';
import FormGroupContextTypes from './FormGroupContextTypes';

const FormGroup = class FormGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayError: false,
        };
    }

    /**
     * Passed form group name
     * @returns {string}
     */
    get name() {
        return this.props.name;
    }

    /**
     * Getting base class name from props and adding `has-error` in case we found error
     * @returns {string}
     */
    get className() {
        let name = this.props.className;
        if (this.error) {
            name += ' has-error';
        }
        return name;
    }

    /**
     * Getting label for current form group by passed name from labels
     * @returns {String}
     */
    get label() {
        return this.context.labels.hasOwnProperty(this.name)
            ? this.context.labels[this.name]
            : this.name;
    }

    /**
     * Getting single error from error object by passed name
     * @returns {String}
     */
    get error() {
        return this.context.errors.hasOwnProperty(this.name)
            ? this.context.errors[this.name]
            : false;
    }

    renderErrorPopup() {
        if (!this.state.displayError) {
            return null;
        }
        let error = Array.isArray(this.error)
            ? this.error.join('. ')
            : this.error;

        return (
            <div className="popup form-popup popup-invalid" key="popup">
                <span className="popup-text">
                    {error}
                </span>
            </div>
        );
    }

    renderIcon() {
        if (!this.props.renderIcon) {
            return null;
        }

        return (
            <i className="icon icon-error-question"
               key="icon"
               onMouseEnter={() => this.setState({displayError: true})}
               onMouseLeave={() => this.setState({displayError: false})}
            />
        );
    }


    renderError() {
        if (!this.error) {
            return null;
        }

        return [
            this.renderIcon(),
            this.renderErrorPopup(),
        ];
    }

    render() {
        return (<div className={this.className}>
            <label className={this.props.labelClassName}>{this.label}</label>
            {this.props.children}
            {this.renderError()}
        </div>);
    }
};

FormGroup.contextTypes = FormGroupContextTypes;

FormGroup.defaultProps = {
    errors: {},
    locale: {},

    className: 'form-group',
    labelClassName: 'form-label',
    errorClassName: 'form-error',

    renderIcon: true,
};

FormGroup.propTypes = {
    name: React.PropTypes.string.isRequired,

    className: React.PropTypes.string,
    labelClassName: React.PropTypes.string,
    errorClassName: React.PropTypes.string,
    renderIcon: React.PropTypes.bool,
};

export default FormGroup;
export const contextTypes = FormGroupContextTypes;