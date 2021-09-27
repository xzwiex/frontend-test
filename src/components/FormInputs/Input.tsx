import { useState, FocusEvent } from 'react'
import { useField } from 'formik'

import styles from './style.scss'


export interface InputProps {
    label?: string
    name: string
}

export function Input(props: InputProps) {
    const { name, label } = props
    const [field, meta, helpers] = useField(name);
    const [focus, setFocus] = useState(false)


    const hasError = meta.error && meta.touched

    const onFocus = (e: FocusEvent<HTMLInputElement>) => {
        setFocus(true)
    }

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        setFocus(false)
        field.onBlur(e)
    }
    return (
        <>
            <div className={`${styles.container} ${hasError ? styles.error : ''} ${(focus || field.value) ? styles.focus : ''}`}>
                {label &&
                    <span className={styles.label}>{label}</span>
                }
                <input className={styles.input} {...field} onFocus={onFocus} onBlur={onBlur} />
            </div>
            {hasError && <div className={styles.errorText}>{meta.error}</div>}
        </>

    )
}