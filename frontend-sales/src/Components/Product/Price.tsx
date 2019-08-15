import {Props as OwnListProps} from '@service/components/productList/Price'
import {Props as OwnDetailsProps} from '@service/components/productDetails/Price'
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../../state';
import React from 'react'
import styles from './Styles.css'
import { serviceComponent } from '../../serviceDecorators/serviceComponent';
import classnames from 'classnames'

@serviceComponent('@service/components/productDetails/Price')
@serviceComponent('@service/components/productList/Price')
class ServiceComponent extends React.Component {}

type StateProps = {
    id: string,
    price?: number
    classNames?: string[],
};

type Props = StateProps

export const Price: React.SFC<Props> = props => {
    if(props.price)
        return <div className={classnames(props.classNames)}>price (from sales): {props.price}</div>;
    return null
}

type OwnProps = OwnListProps & OwnDetailsProps

const mapStateToProps: MapStateToProps<StateProps, OwnProps, RootState> = (state, props) => {
    let priceTuple = state.sales.productPriceById.find(p => p.id === props.productId);
    return {
        id: props.productId,
        price: priceTuple ? priceTuple.price : undefined
    }
}

export default connect(mapStateToProps)(Price);