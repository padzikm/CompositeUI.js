import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { serviceComponent } from '../../serviceDecorators/serviceComponent';
import { Props as OwnProps } from '@service/components/addProduct/Form';
import { CreateProductId, CreateProduct } from '@service/actions';
import { Price } from './Price';
import { RootState } from '../../state';
import Description from '@service/components/addProduct/Description'
import StockQuantity from '@service/components/addProduct/StockQuantity'
import deepmerge from 'deepmerge'
import { Redirect } from 'react-router-dom';
import { CreatingProduct } from '../../state/actions';
import Alert from '@service/infrastructure/alert'
import styles from './ProductForm.css'

type DispatchProps = {
    createProductId: () => void
    createProduct: (productData: {[key: string]: unknown}, id: string) => void
}

type StateProps = {
    creatingProductId: boolean
    newProductId?: string
    creatingProduct: boolean
}

type Props = StateProps & DispatchProps & OwnProps;

type State = {
    formData: {
        [key: string]: unknown
    }
    isFormValid: {
        [key: string]: boolean
    }
}

@serviceComponent('@service/components/addProduct/Form')
export class ProductForm extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = { formData: {}, isFormValid: {} }
    }

    componentDidMount() {
        this.props.createProductId()
    }

    handleFormChange = (formData: {[key: string]: unknown}, isServiceFormValid: {[serviceKey: string]: boolean}) => {
        this.setState(prevState => {
            let mergedServiceData = deepmerge(prevState.formData, formData);
            let mergedIsFormValid = deepmerge(prevState.isFormValid, isServiceFormValid)
            return {formData: mergedServiceData, isFormValid: mergedIsFormValid}
        })
    }

    handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault();
        this.props.createProduct(this.state.formData, this.props.newProductId!);
    }

    render() {
        if (this.props.creatingProductId || !this.props.newProductId)
            return <div>Loading...</div>

        if(this.props.creatingProduct)
            return <Alert message={'creating product'}><Redirect push={true} to={this.props.redirectUrl} /></Alert>

        let canSubmit = true;
        for(let serviceKey in this.state.isFormValid)
            canSubmit = canSubmit && this.state.isFormValid[serviceKey];
                
        return (
            <form className={styles.form}>
                <Description productId={this.props.newProductId!} onFormChange={this.handleFormChange} classNames={[styles.formRow]} />
                <Price productId={this.props.newProductId!} onFormChange={this.handleFormChange} classNames={[styles.formRow]} />
                <StockQuantity productId={this.props.newProductId!} onFormChange={this.handleFormChange} classNames={[styles.formRow]} />
                <input type="submit" value="create product" onClick={this.handleSubmit} disabled={!canSubmit} className={styles.submitBtn} />
            </form>
        )
    }
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, RootState> = (state, props) => {
    return {
        newProductId: state.sales.newProductId,
        creatingProductId: state.sales.creatingProductId,
        creatingProduct: state.sales.creatingProduct
    }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = dispatch => {
    return {
        createProductId: () => dispatch(dispatch => {

            fetch('/createProductId', {method: 'Post'}).then(res => res.json()).then(json => {
                let action: CreateProductId = {
                    type: "CreateProductId",
                    id: json.id
                }
                
                dispatch(action)
            })
        }),
        createProduct: (data: {[key: string]: unknown}, id: string) => dispatch(dispatch => {
            let beforeAction: CreatingProduct = {
                type: "CreatingProduct"
            }
            dispatch(beforeAction)

            let reqBody = {
                id,
                ...data
            }
            fetch('/createProduct', {method: 'Post', body: JSON.stringify(reqBody), headers: {'Content-Type': 'application/json'}})
            .then(res => res.json())
            .then(json => {
                let action: CreateProduct = {
                    type: 'CreateProduct',
                    id,
                    ...json
                };
                dispatch(action)
            })
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);