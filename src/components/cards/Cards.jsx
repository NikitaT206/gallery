import styles from './Cards.module.css'
import { Card } from '../card/Card'
import { useSelector, useDispatch } from 'react-redux'
import { setNumberOfSlice, setCurrentCards, setCurrentTab, setInitialCards } from '../../services/slices/mainSlice'
import { useEffect } from 'react'

export function Cards({tabsRef, width}) {
  const {fade, currentCards, numberOfSlice, clickedCards, initialCards} = useSelector(state => state.main)
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

  useEffect(() => {
    const deleteByKey = (event) => {
      if (event.key === 'Delete') {
        const filteredCards = initialCards.filter(card => !clickedCards.includes(card.id))
        dispatch(setInitialCards(filteredCards))
      }
    }
    document.addEventListener('keydown', deleteByKey)
    return () => document.removeEventListener('keydown', deleteByKey)
  })

  return (
    <section className={styles.cards}>

      <div className={fade ? styles.currentCardsFade : styles.currentCards}>
        {currentCards.slice(0, numberOfSlice).map(card => {
          return <Card card={card} key={card.id} tabsRef={tabsRef} width={width}/>
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