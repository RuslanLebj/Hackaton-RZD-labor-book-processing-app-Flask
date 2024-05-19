import { useRouter } from 'next/router'
import styles from './header.module.scss'
import Link from 'next/link'

export default function Header(){

  const router = useRouter()

  return (
    <header className={styles.header}>
    <h1 className={styles.header__title}>AIWorkLog Converter</h1>
    <div className={styles.header__modelSelectContainer}>
        <Link href={'/'} className={`${styles.header__link} ${router.pathname === '/' ? styles.header__link_active : styles.header__link_inactive}`}>Загрузка книг</Link>
        <Link href={'/archive'} className={`${styles.header__link} ${router.pathname === '/archive' ? styles.header__link_active : styles.header__link_inactive}`}>Архив книг</Link>
    </div> 
    <img src="/icons/railways.png" width={95} height={65} alt=""/>
  </header>
  )
}