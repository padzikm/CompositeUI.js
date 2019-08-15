import { Props as OwnProps } from '@service/components/productList/Description'
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../../state';
import React from 'react'
import { serviceComponent } from '../../serviceDecorators/serviceComponent';
import classnames from 'classnames'

@serviceComponent('@service/components/productList/Description')
class ServiceComponent extends React.Component { }

type StateProps = {
    id: string,
    name: string,
    description: string
};

type Props = StateProps & OwnProps

export const Price: React.SFC<Props> = props => {
    return <>
        <div className={classnames(props.classNames)}>name (from marketing): {props.name}</div>
        <div className={classnames(props.classNames)}>description (from marketing): {props.description}</div>
    </>;
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, RootState> = (state, props) => {
    return {
        id: props.productId,
        name: state.marketing.productNameById.find(p => p.id === props.productId)!.name,
        description: state.marketing.productDescriptionById.find(p => p.id === props.productId)!.description
    }
}

export default connect(mapStateToProps)(Price);