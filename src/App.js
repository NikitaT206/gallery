import styles from './App.module.css'
import { Header } from './components/header/Header';
import {Tabs} from './components/tabs/Tabs'
import {Cards} from './components/cards/Cards'
import { useRef, useState, useEffect } from 'react';

function App() {
  const tabsRef = useRef()

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const resizeListener = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', resizeListener)
    return () => window.removeEventListener('resize', resizeListener)
  }, [])

  return (
    <div className={styles.app}>

      <div className={styles.heading}>
        <Header/>
        <h1 className={styles.title}>Portfolio</h1>
        <p className={styles.subtitle}>Agency provides a full service range including technical skills, design, business understanding.</p>
      </div>

      <main className={styles.main}>
        <Tabs tabsRef={tabsRef}/>
        <Cards tabsRef={tabsRef} width={width}/>
      </main>
    </div>
  );
}

export default App;
