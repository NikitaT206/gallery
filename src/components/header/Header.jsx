import styles from './Header.module.css'
import logo from '../../images/logo.svg'

export function Header() {
  return (
    <header className={styles.header}>

      <div className={styles.logoContainer}>
        <img src={logo} className={styles.logo} alt='logo'/>
      </div>

      <nav className={styles.links}>
        <a className={styles.link} href='#.'>About</a>
        <a className={styles.link} href='#.'>Services</a>
        <a className={styles.link} href='#.'>Pricing</a>
        <a className={styles.link} href='#.'>Blog</a>
      </nav>

      <button className={styles.button}>CONTACT</button>

    </header>
  )
}