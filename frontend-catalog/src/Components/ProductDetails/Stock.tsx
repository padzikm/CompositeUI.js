import React from 'react';
import { Props as OwnProps } from '@service/components/productDetails/Stock'
import { serviceComponent } from '../../serviceDecorators/serviceComponent';
import { MapStateToProps, connect } from 'react-redux';
import { RootState } from '../../state/reducers'
import classnames from 'classnames'

type Props = {
  id: string,
  quantity?: number
  classNames?: string[]
}

export const Presentation: React.SFC<Props> = props => {
  if (props.quantity)
    return (<div className={classnames(props.classNames)}>quantity (from catalog): {props.quantity}</div>);
  return null
}

const mapStateToProps: MapStateToProps<Props, OwnProps, RootState> = (state, props) => {
  let quantityTuple = state.catalog.productQuantityById.find(p => p.id === props.productId);
  return {
    id: props.productId,
    quantity: quantityTuple ? quantityTuple.quantity : undefined
  }
}

export default connect(mapStateToProps)(Presentation);

@serviceComponent('@service/components/productDetails/Stock')
class ServiceComponent { }