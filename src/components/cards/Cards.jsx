import styles from './Cards.module.css'
import { Card } from '../card/Card'
import { useSelector, useDispatch } from 'react-redux'
import { setNumberOfSlice, setCurrentCards, setCurrentTab } from '../../services/slices/mainSlice'
import { useEffect } from 'react'

export function Cards({mainRef, width}) {
  const {fade, currentCards, numberOfSlice, initialCards} = useSelector(state => state.main)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentTab('Show All'))
    setTimeout(() => {
      dispatch(setCurrentCards())
    }, 200)
  }, [])

  useEffect(() => {
    dispatch(setCurrentCards())
  }, [initialCards])

  return (
    <section className={styles.cards}>

      <div className={fade ? styles.currentCardsFade : styles.currentCards}>
        {currentCards.slice(0, numberOfSlice).map((card, index) => {
          return <Card card={card} key={card._id} mainRef={mainRef} width={width} index={index}/>
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