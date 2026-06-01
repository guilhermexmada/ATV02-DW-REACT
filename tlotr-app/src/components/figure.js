import Image from 'next/image'
import styles from '@/components/figure.module.css'

export const Figure = ({ type = 'human' }) => {
    return (
        <div className={styles.figureContainer}>
            <Image
                src={`/imgs/${type}.png`} // aponta pra figura na /public
                alt={`Silhueta de ${type}`}
                width={80}
                height={100}
            />
        </div>
    )
}