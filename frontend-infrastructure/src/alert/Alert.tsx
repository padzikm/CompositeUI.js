import React from 'react'

type Props = {
    message: string
}

export class Alert extends React.Component<Props>{
    componentDidMount(){
        alert(this.props.message)
    }

    render(){
        return this.props.children;
    }
};