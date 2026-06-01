import styles from '@/components/error.module.css'

export const Error = ({ message = 'Erro interno do servidor' }) => {
    return (
        <div className={styles.error}>Erro: {message}</div>
    )
}