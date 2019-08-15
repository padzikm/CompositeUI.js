import React from 'react'
import styles from './FormField.css'

type Props = {
    id: string
    label: string
    value?: string
    error?: string
    onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormField: React.SFC<Props> = props => {
    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <input id={props.id} type="text" value={props.value} onChange={props.onValueChange} className={styles.input} />
            {props.error ? <span className={styles.error}>error: {props.error}</span> : null}
        </div>
    )
}