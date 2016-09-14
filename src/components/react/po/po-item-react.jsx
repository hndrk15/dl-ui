import React from 'react';

import TextboxReact from '../basic/textbox-react.jsx';
import NumericReact from '../basic/numeric-react.jsx';
import UomAutoSuggestReact from '../auto-suggests/uom-auto-suggest-react.jsx';

'use strict';

export default class PoItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleDefaultQuantityChange = this.handleDefaultQuantityChange.bind(this);
        this.handleDealQuantityChange = this.handleDealQuantityChange.bind(this);
        this.handleDealMeasurementChange = this.handleDealMeasurementChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleDefaultQuantityChange(quantity) {
        var value = this.state.value;
        value.defaultQuantity = quantity;
        this.handleValueChange(value);
    }

    handleDealQuantityChange(quantity) {
        var value = this.state.value;
        value.dealQuantity = quantity;
        this.handleValueChange(value);
    }

    handleDealMeasurementChange(event, uom) {
        var value = this.state.value;
        value.dealMeasurement = uom;
        this.handleValueChange(value);
    }

    handleDescriptionChange(desc) {
        var value = this.state.value;
        value.description = desc;
        this.handleValueChange(value);
    }

    handlePriceChange(price) {
        var value = this.state.value;
        value.price = price;
        this.handleValueChange(value);
    }

    handleRemove() {
        if (this.props.onRemove)
            this.props.onRemove(this.state.value);
    }

    componentWillMount() {
        this.setState({ value: this.props.value || {}, error: this.props.error || {}, options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || {}, error: props.error || {}, options: props.options || {} });
    }

    render() {
        var readOnlyOptions = { readOnly: this.state.options.readOnly || this.state.options.isSplit };
        var defaultMeasurementOptions = Object.assign({}, this.state.options, { readOnly: true });
        var dealQtyOptions = Object.assign({}, this.state.options, { min: 0 });
        var descOptions = readOnlyOptions;
        var dealMeasurementOptions = readOnlyOptions;
        var removeButton = null

        if (!this.state.options.readOnly)
            removeButton = <button className="btn btn-danger" onClick={this.handleRemove}>-</button>;

        var style = {
            margin: 0 + 'px'
        }

        return (
            <tr>
                <td>
                    <div className={`form-group ${this.state.error.product ? 'has-error' : ''}`} style={style}>
                        {this.props.children}
                        <span className="help-block">{this.state.error.product}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.defaultQuantity ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.defaultQuantity} options={this.state.options} onChange={this.handleDefaultQuantityChange}/>
                        <span className="help-block">{this.state.error.defaultQuantity}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.defaultMeasurement ? 'has-error' : ''}`} style={style}>
                        <UomAutoSuggestReact value={this.state.value.defaultMeasurement} options={defaultMeasurementOptions} />
                        <span className="help-block">{this.state.error.defaultMeasurement}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.dealQuantity ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.dealQuantity} options={dealQtyOptions} onChange={this.handleDealQuantityChange}/>
                        <span className="help-block">{this.state.error.dealQuantity}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.dealMeasurement ? 'has-error' : ''}`} style={style}>
                        <UomAutoSuggestReact value={this.state.value.dealMeasurement} options={dealMeasurementOptions} onChange={this.handleDealMeasurementChange}/>
                        <span className="help-block">{this.state.error.dealMeasurement}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.price ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.price} options={this.state.options} onChange={this.handlePriceChange}/>
                        <span className="help-block">{this.state.error.price}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.description ? 'has-error' : ''}`} style={style}>
                        <TextboxReact value={this.state.value.description} options={descOptions} onChange={this.handleDescriptionChange}/>
                        <span className="help-block">{this.state.error.description}</span>
                    </div>
                </td>
                <td>
                    {removeButton}
                </td>
            </tr>
        )
    }
} 