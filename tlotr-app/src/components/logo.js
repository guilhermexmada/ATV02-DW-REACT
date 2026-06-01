import Image from 'next/image'
import styles from '@/components/logo.module.css'

export const SauronLogo = ({ size = 100 }) => {
    return (
        <div className={styles.logoContainer}>
            <Image
                src="/imgs/logo.png" // aponta pra logo na /public
                alt="Logo do Olho de Sauron"
                width={size}
                height={size}
                priority // Next.js carrega prioritariamente a logo
            />
        </div>
    )
}