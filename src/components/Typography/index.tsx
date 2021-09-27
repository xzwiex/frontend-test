
import styles from './style.scss'

export interface TypoProps {
    children: React.ReactNode
    uppercase?: boolean
    className?: string
}

interface TypoElementProps extends TypoProps {
    tag: React.ElementType
}

export function TypoElement(props: TypoElementProps) {
    const { tag: Tag, uppercase = false, className = '', children } = props;
    return (<Tag className={`${styles[Tag]} ${uppercase ? styles.uppercase : ''} ${className}`}>{children}</Tag>)
}

export const H1 = (props: TypoProps) => <TypoElement {...props} tag="h1" />
export const H2 = (props: TypoProps) => <TypoElement {...props} tag="h2" />
export const H3 = (props: TypoProps) => <TypoElement {...props} tag="h3" />
export const H4 = (props: TypoProps) => <TypoElement {...props} tag="h4" />
export const P = (props: TypoProps) => <TypoElement {...props} tag="p" />
