import React from 'react'

type Props = {
    productId: string
    onFormChange: (formData: { [key: string]: unknown }, isServiceFormValid: { [serviceKey: string]: boolean }) => void
    classNames?: string[]
}

export default class Component extends React.Component<Props> { }