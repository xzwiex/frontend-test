import { useField } from 'formik'

import styles from './style.scss'

interface CheckboxProps {
    label: string
    name: string
}

export function Checkbox(props: CheckboxProps) {
    const { name, label } = props

    const [field, meta, helpers] = useField(name);

    return (
        <div className={styles.checkboxContainer} onClick={() => helpers.setValue(!field.value)}>
            <div className={`${styles.checkmark} ${field.value ? styles.checked : styles.unchecked}`}>
                {field.value && <i className="icon icon-checkmark"></i>}
            </div>
            <span className={styles.checkboxLabel}>{label}</span>
        </div>
    )
}