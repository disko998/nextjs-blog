import cn from 'classnames'
import styles from './alert.module.css'

export default function Alert({ message, type }) {
    return (
        <div
            className={cn(styles.alert, {
                [styles.success]: type === 'success',
                [styles.error]: type === 'error',
            })}
        >
            {message}
        </div>
    )
}
