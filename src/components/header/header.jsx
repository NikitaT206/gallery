import styles from './header.module.css'
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation()

  return (
    <div className={styles.header}>
      <h1 className={styles.logo}>GALLERY</h1>
      {location.pathname === '/upload' ? <Link className={styles.link} to={'/'}>Return</Link> : <Link className={styles.link} to={'/upload'}>Post Image</Link>}
    </div>
  )
}