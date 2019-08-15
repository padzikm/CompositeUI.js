import React from 'react';
import classnames from 'classnames'
import styles from './Price.css'

type State = {
    error?: string
    price: string
}

type Props = {
    productId: string
    onFormChange: (formData: { [key: string]: unknown }, isServiceFormValid: { [serviceKey: string]: boolean }) => void
    classNames?: string[]
}

export class Price extends React.Component<Props, State> {

    constructor(props) {
        super(props)
        this.state = { price: '' }
    }


    componentDidMount() {
        let isServiceFormValid = {
            'AddProduct_Sales_Price': false
        }
        this.props.onFormChange({}, isServiceFormValid);
    }

    handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let price = Number(value)
        let isValid = !isNaN(price) && price >= 0
        let error: string | undefined;
        if (!isValid)
            error = 'price must be a positive number'

        this.setState({ price: value, error });

        let formData = {
            sales: {
                productId: this.props.productId,
                price
            }
        }
        let isServiceFormValid = {
            'AddProduct_Sales_Price': isValid
        }
        this.props.onFormChange(formData, isServiceFormValid);
    }

    render() {
        let { price, error } = this.state
        return <div className={classnames(this.props.classNames)}>
            <label htmlFor={'addProductPrice'}>product price</label>
            <input id={'addProductPrice'} type="text" value={price} onChange={this.handlePriceChange} className={styles.input} />
            {error ? <span className={styles.error}>error: {error}</span> : null}
        </div>
    }
}
