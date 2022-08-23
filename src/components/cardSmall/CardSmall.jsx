import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCard, setCurrentCardFade } from '../../services/slices/mainSlice'
import styles from './CardSmall.module.css'

export function CardSmall({card}) {
  const {currentCard} = useSelector(state => state.main)
  const isCurrentCard = currentCard.id === card.id
  const dispatch = useDispatch()

  function onClickHandler(event) {
    event.stopPropagation()
    if (currentCard.id === card.id) return
    dispatch(setCurrentCardFade(true))
    setTimeout(() => {
      dispatch(setCurrentCard(card))
      dispatch(setCurrentCardFade(false))
    }, 300)
  }

  const ref = useRef()

  useEffect(() => {
    if (currentCard.id == ref.current.id) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [currentCard])

  return (
    <div 
      className={isCurrentCard ? styles.currentCard : styles.card} 
      id={card.id}
      onClick={onClickHandler}
      ref={ref}
      >
      <img src={card.image} className={styles.image}></img>
    </div>
  )
}