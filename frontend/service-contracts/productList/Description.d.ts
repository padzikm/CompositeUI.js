import React from 'react'

export interface Props {
    productId: string
    classNames?: string[]
}

export default class Component extends React.Component<Props> { }