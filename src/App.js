import styles from './App.module.css'
import { Header } from './components/header/Header';
import {Tabs} from './components/tabs/Tabs'
import {Cards} from './components/cards/Cards'
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTabsOpen } from './services/slices/mainSlice';
import { FullViewCards } from './components/fullViewCards/fullViewCards';

function App() {
  const mainRef = useRef()
  const dispatch = useDispatch()
  const {isPopupOpen} = useSelector(state => state.main)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const resizeListener = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', resizeListener)
    return () => window.removeEventListener('resize', resizeListener)
  }, [])

  return (
    <div className={isPopupOpen ? styles.noScroll : styles.app} onClick={() => dispatch(setTabsOpen(false))}>
      <div className={isPopupOpen ? styles.blur : styles.notBlur}>
        <div className={styles.heading}>
          <Header/>
          <h1 className={styles.title}>Portfolio</h1>
          <p className={styles.subtitle}>Agency provides a full service range including technical skills, design, business understanding.</p>
        </div>

        <main className={styles.main} ref={mainRef}>
          <Tabs mainRef={mainRef}/>
          <Cards mainRef={mainRef} width={width}/>
        </main>
      </div>

      {isPopupOpen && <FullViewCards/>}
    </div>
  );
}

export default App;
