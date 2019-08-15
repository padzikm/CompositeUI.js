import React from 'react';
import { Props as OwnProps } from '@service/components/productDetails/Description'
import { MapStateToProps, connect } from 'react-redux';
import { RootState } from '../../state/reducers'
import classnames from 'classnames'

type Props = {
  id: string,
  name?: string,
  description?: string,
  classNames?: string[]
}

export const Presentation: React.SFC<Props> = props => {
  if (props.name)
    return (<>
      <div className={classnames(props.classNames)}>name (from marketing): {props.name}</div>
      <div className={classnames(props.classNames)}> desc (from marketing): {props.description}</div>
    </>);
  return null
}

const mapStateToProps: MapStateToProps<Props, OwnProps, RootState> = (state, props) => {
  let nameTuple = state.marketing.productNameById.find(p => p.id === props.productId);
  let descriptionTuple = state.marketing.productDescriptionById.find(p => p.id === props.productId);
  return {
    id: props.productId,
    name: nameTuple ? nameTuple.name : undefined,
    description: descriptionTuple ? descriptionTuple.description : undefined
  }
}

export const Description = connect(mapStateToProps)(Presentation);