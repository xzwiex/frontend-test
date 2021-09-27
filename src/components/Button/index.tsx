import React from 'react'

import styles from './style.scss'


export interface ButtonProps {
    type: 'button' | 'submit'
    onClick?: () => void
    children: React.ReactNode
}



export function Button(props: ButtonProps) {
    const { type, children, onClick } = props

    return (
        <button className={styles.button} type={props.type} onClick={onClick} >
            {children}
        </button>
    )


}