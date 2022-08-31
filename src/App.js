import styles from './App.module.css'
import {Tabs} from './components/tabs/Tabs'
import {Cards} from './components/cards/Cards'
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImages, postImage, setTabsOpen } from './services/slices/mainSlice';
import { FullViewCards } from './components/fullViewCards/fullViewCards';
import { Header } from './components/header/header';
import { PostImageForm } from './components/postImageForm/postImageForm';
import { Route, Routes } from 'react-router-dom';

function App() {
  const mainRef = useRef()
  const dispatch = useDispatch()
  const {isPopupOpen, loadedCards} = useSelector(state => state.main)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const resizeListener = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', resizeListener)
    return () => window.removeEventListener('resize', resizeListener)
  }, [])

  return (
    <div 
      className={isPopupOpen ? styles.noScroll : styles.app} 
      onClick={() => dispatch(setTabsOpen(false))}
    >
      <Header/>
      <Routes>
        <Route path='/upload' element={<PostImageForm/>}/>
        <Route path='/' element={(
          <div className={isPopupOpen ? styles.blur : styles.notBlur}>
            <main className={styles.main} ref={mainRef}>
              <Tabs mainRef={mainRef}/>
              <Cards mainRef={mainRef} width={width}/>
            </main>
          </div>
        )}/>
      </Routes>
      
      {isPopupOpen && <FullViewCards/>}
    </div>
  );
}

export default App;
