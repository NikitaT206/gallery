import styles from './Cards.module.css'
import { Card } from '../card/Card'
import { useSelector, useDispatch } from 'react-redux'
import { setNumberOfSlice, setCurrentCards, setPopupOpen } from '../../services/slices/mainSlice'
import { useEffect } from 'react'
import { setShowInfoPanel } from '../../services/slices/infoPanelSlice'

export function Cards({mainRef, width}) {
  const {fade, currentCards, numberOfSlice, initialCards, getImagesLoading} = useSelector(state => state.main)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPopupOpen(false))
    dispatch(setShowInfoPanel(false))
    setTimeout(() => {
      dispatch(setCurrentCards())
    }, 200)
  }, [dispatch])

  useEffect(() => {
    dispatch(setCurrentCards())
  }, [initialCards, dispatch])

  if (getImagesLoading) {
    return (
      <div className={styles.loader}>
        <div className={styles.ldsdualring}></div>
      </div>
    )
  }

  return (
    <section className={styles.cards}>

      <div className={fade ? styles.currentCardsFade : styles.currentCards}>
        {currentCards.slice(0, numberOfSlice).map((card, index) => {
          return (
            <Card 
              card={card} 
              key={card._id} 
              mainRef={mainRef} 
              width={width} 
              index={index}
            />
          ) 
        })}
      </div>

      {numberOfSlice < currentCards.length && 
        <button 
          className={styles.button}
          onClick={() => dispatch(setNumberOfSlice())}
          type={'button'}
        >LOAD MORE</button>
      }
     
    </section>
  )
}