import * as React from 'react'
import Header from '@service/branding/Header'
import styles from './Welcome.css'

export const Welcome: React.SFC = () => (
    <div className={styles.container}>
        <h1>Welcome to SOA CompositeUI.js</h1>
        <Header><a href={'https://github.com/padzikm/CompositeUI.js'}>https://github.com/padzikm/CompositeUI.js</a></Header>
        <Header><a href={'mailto:padzikm@gmail.com'}>mailto:padzikm@gmail.com</a></Header>
    </div>
)