import styles from './style.scss'

export interface RatingStarsProps {
    rating: number
}

export function RatingStars(props: RatingStarsProps) {

    const width = props.rating / 5 * 100
    return (
        <div className={styles.container}>
            <div className={styles.stars}>
                <div className={styles.starsBg}>
                    <i className={`icon-star ${styles.starBg}`}></i>
                    <i className={`icon-star ${styles.starBg}`}></i>
                    <i className={`icon-star ${styles.starBg}`}></i>
                    <i className={`icon-star ${styles.starBg}`}></i>
                    <i className={`icon-star ${styles.starBg}`}></i>
                </div>
                <div className={styles.starsFill} style={{ width: `${width}%` }}>
                    <i className={`icon-star ${styles.starFg}`}></i>
                    <i className={`icon-star ${styles.starFg}`}></i>
                    <i className={`icon-star ${styles.starFg}`}></i>
                    <i className={`icon-star ${styles.starFg}`}></i>
                    <i className={`icon-star ${styles.starFg}`}></i>
                </div>
            </div>
            {props.rating} out of 5
        </div>
    )
}