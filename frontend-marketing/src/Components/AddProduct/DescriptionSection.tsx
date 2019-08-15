import React from 'react';
import { Props } from '@service/components/addProduct/Description'
import { serviceComponent } from '../../serviceDecorators/serviceComponent';
import { ProductName } from './Name';
import { ProductDescription } from './Description';
import classnames from 'classnames'

@serviceComponent('@service/components/addProduct/Description')
export class Description extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.state = { name: {value: ''}, description: {value: ''} }
    }

    handleNameChange = (value: string | undefined, isValid: boolean) => {
        let formData = {
            marketing: {
                productId: this.props.productId,
                name: value
            }
        }
        let isServiceFormValid = {
            'AddProduct_Description_Name': isValid
        }
        this.props.onFormChange(formData, isServiceFormValid)
    }

    handleDescriptionChange = (value: string | undefined, isValid: boolean) => {
        let formData = {
            marketing: {
                productId: this.props.productId,
                description: value
            }
        }
        let isServiceFormValid = {
            'AddProduct_Description_Description': isValid
        }
        this.props.onFormChange(formData, isServiceFormValid)
    }

    render() {
        return <React.Fragment>
            <div className={classnames(this.props.classNames)}><ProductName onChange={this.handleNameChange} /></div>
            <div className={classnames(this.props.classNames)}><ProductDescription onChange={this.handleDescriptionChange} /></div>
        </React.Fragment>
    }
}

export default Description;