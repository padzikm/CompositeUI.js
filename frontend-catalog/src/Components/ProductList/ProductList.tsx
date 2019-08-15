import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { serviceComponent } from '../../serviceDecorators/serviceComponent';
import { Props as OwnProps } from '@service/components/productList/Body'
import { GetProductList } from '@service/actions';
import React from 'react';
import { RootState } from '../../state';
import Description from '@service/components/productList/Description'
import Price from '@service/components/productList/Price'
import { Link } from 'react-router-dom';
import styles from './ProductList.css'

type StateProps = {
    detailsUrl: string,
    quantityById?: { id: string, quantity: number }[]
}

type DispatchProps = {
    getProductList: () => void;
}

type Props = StateProps & DispatchProps

@serviceComponent('@service/components/productList/Body')
export class ProductList extends React.Component<Props> {

    componentDidMount() {
        this.props.getProductList();
    }

    render() {
        if (!this.props.quantityById)
            return (<div>Loading...</div>)

        return (<div className={styles.containerList}>
            {this.props.quantityById.map(p => <div key={p.id} className={styles.listItem}>
                <Description productId={p.id} classNames={[styles.rowItem]} />
                <Price productId={p.id} classNames={[styles.rowItem]} />
                <div className={styles.rowItem}>quantity (from catalog): {p.quantity}</div>
                <Link to={`${this.props.detailsUrl}/${p.id}`} className={styles.rowItem}>Details</Link>
            </div>)}
        </div>)
    }
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, RootState> = (state, props) => {
    return {
        detailsUrl: props.detailsUrl,
        quantityById: state.catalog.productQuantityById.sort((a, b) => a.quantity - b.quantity)
    }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = dispatch => {
    return {
        getProductList: () => {
            dispatch((dispatch) => {
                fetch('/getProductList').then((result) => result.json()).then(json => {
                    let action: GetProductList = {
                        type: "GetProductList",
                        ...json
                    }
                    dispatch(action)
                });
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)