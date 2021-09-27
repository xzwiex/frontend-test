import React, { useState, FocusEvent } from 'react'
import { useField, Form, FormikProps, Formik } from 'formik';

import styles from './style.scss'

export interface SelectOption {
    label: string
    value: string
}

export interface SelectProps {
    label?: string
    name: string
    options: SelectOption[]
}

export function Select(props: SelectProps) {
    const { name, label, options } = props
    const [field, meta, helpers] = useField(name);

    const hasError = meta.error && meta.touched


    return (
        <>
            <div className={`${styles.container} ${hasError ? styles.error : ''}  ${styles.labelOnTop}`}>
                {label &&
                    <span className={styles.label}>{label}</span>
                }
                <select className={styles.select} {...field} name={name}>
                    {field.value ? null : <option defaultValue="">Please select...</option>}
                    {options.map((o) => <option key={`option_${o.value}`}>{o.label}</option>)}
                </select>

                <i className={`icon-triangle-down ${styles.dropdownIcon}`}></i>

            </div>
            {hasError && <div className={styles.errorText}>{meta.error}</div>}
        </>

    )
}