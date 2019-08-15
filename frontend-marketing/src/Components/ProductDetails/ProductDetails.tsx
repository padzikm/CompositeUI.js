import { MapDispatchToProps, connect, MapStateToProps } from "react-redux";
import React from 'react';
import Price from '@service/components/productDetails/Price'
import Stock from '@service/components/productDetails/Stock'
import { Description } from './Description'
import styles from './ProductDetails.css'
import { withRouter, match } from 'react-router-dom';
import { History, Location, Action } from 'history';
import { serviceComponent } from '../../serviceDecorators/serviceComponent';
import { RouteParams } from '@service/routes/productDetails'
import { LoadingProductDetails } from '../../state/actions';
import { RootState } from '../../state';
import { GetProductDetails } from '@service/actions';

type DispatchProps = {
    getProductDetails: (id: string) => void
}

type StateProps = {
    id: string,
    loading: boolean
}

type OwnProps = {
    match: match<RouteParams>,
    history: History,
    location: Location
}

type Props = StateProps & DispatchProps;

@serviceComponent('@service/components/productDetails/Description')
export class ProductDetails extends React.Component<Props> {

    componentDidMount() {
        this.props.getProductDetails(this.props.id);
    }

    render() {
        return (<div>
            {this.props.loading ? (<div>Loading...</div>) :
                (<div className={styles.container}>
                    <Description productId={this.props.id} classNames={[styles.item]} />
                    <Price productId={this.props.id} classNames={[styles.item]} />
                    <Stock productId={this.props.id} classNames={[styles.item]} />
                </div>)}
        </div>)
    }
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, RootState> = (state, props) => {
    return {
        id: props.match.params.id,
        loading: state.marketing.loadingProductDetails
    }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => {
    return {
        getProductDetails: (id: string) => dispatch(dispatch => {
            let beforeLoadAction: LoadingProductDetails = {
                type: "LoadingProductDetails"
            }
            dispatch(beforeLoadAction)

            fetch(`/getProductDetails/${id}`).then(result => result.json()).then(json => {
                let action: GetProductDetails = {
                    type: "GetProductDetails",
                    id,
                    ...json
                }
                dispatch(action)
            })
        })
    }
}

const connected = connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

export default withRouter<OwnProps, typeof connected>(connected);
