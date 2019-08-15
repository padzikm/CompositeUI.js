import React from 'react';
import { Props } from '@service/components/addProduct/StockQuantity'
import { serviceComponent } from '../../serviceDecorators/serviceComponent';
import classnames from 'classnames'
import styles from './StockQuantity.css'

type State = {
    error?: string
    quantity: string
}

@serviceComponent('@service/components/addProduct/StockQuantity')
export class StockQuantity extends React.Component<Props, State> {

    constructor(props){
        super(props);
        this.state = {quantity: ''}
    }

    componentDidMount(){
        let isServiceFormValid = {
            'AddProduct_Catalog_Quantity': false
        }
        this.props.onFormChange({}, isServiceFormValid);
    }

    handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let quantity = Number(value)
        let isValid = !isNaN(quantity) && quantity >= 0
        let error: string | undefined;
        if (!isValid)
            error = 'quantity must be a positive number'
        this.setState({quantity: value, error});

        let formData = {
            catalog: {
                productId: this.props.productId,
                quantity: quantity
            }
        }
        let isServiceFormValid = {
            'AddProduct_Catalog_Quantity': isValid
        }
        this.props.onFormChange(formData, isServiceFormValid);
    }

    render() {
        let { quantity, error } = this.state;
        return <div className={classnames(this.props.classNames)}>
            <label htmlFor={'addProductQuantity'}>product quantity</label>
            <input id={'addProductQuantity'} type="text" value={quantity} onChange={this.handleQuantityChange} className={styles.input} />
            {error ? <span className={styles.error}>error: {error}</span> : null}
        </div>
    }
}

export default StockQuantity