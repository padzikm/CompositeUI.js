import React from 'react'

type Props = {
    text?: string
}

export class Header extends React.Component<Props>{
    render(){
        return <h3>{this.props.text || this.props.children}</h3>
    }
}