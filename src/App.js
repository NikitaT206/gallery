import styles from './App.module.css'
import { Tabs } from './components/tabs/Tabs'
import { Cards } from './components/cards/Cards'
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImages, setPostCardSuccessFalse, setTabsOpen } from './services/slices/mainSlice';
import { FullViewCards } from './components/fullViewCards/fullViewCards';
import { Header } from './components/header/header';
import { PostImageForm } from './components/postImageForm/postImageForm';
import { Route, Routes } from 'react-router-dom';

function App() {
  const mainRef = useRef()
  const dispatch = useDispatch()
  const {isPopupOpen} = useSelector(state => state.main)

  useEffect(() => {
    dispatch(getAllImages())
    dispatch(setPostCardSuccessFalse())
  }, [dispatch])

  return (
    <div 
      className={styles.app} 
      onClick={() => dispatch(setTabsOpen(false))}
    >
      <Header/>
      <Routes>
        <Route path={'*'} element={<h1>404</h1>}/>
        <Route path='/upload' element={<PostImageForm/>}/>
        <Route path='/' element={(
          <div className={isPopupOpen ? styles.blur : styles.notBlur}>
            <main className={styles.main} ref={mainRef}>
              <Tabs mainRef={mainRef}/>
              <Cards mainRef={mainRef}/>
            </main>
          </div>
        )}/>
        <Route path={`/full/:id`} element={<FullViewCards/>}/>
      </Routes>
    </div>
  );
}

export default App;
