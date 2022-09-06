import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCard, setCurrentCardFade } from '../../services/slices/mainSlice'
import { API } from '../../utils/api'
import styles from './CardSmall.module.css'

export function CardSmall({card}) {
  const {currentCard} = useSelector(state => state.main)
  const isCurrentCard = currentCard._id === card._id
  const dispatch = useDispatch()

  function onClickHandler(event) {
    event.stopPropagation()
    if (currentCard._id === card._id) return
    dispatch(setCurrentCardFade(true))
    setTimeout(() => {
      dispatch(setCurrentCard(card))
      dispatch(setCurrentCardFade(false))
    }, 100)
  }

  const ref = useRef()

  useEffect(() => {
    if (currentCard._id === ref.current.id) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [currentCard])

  return (
    <div 
      className={isCurrentCard ? styles.currentCard : styles.card} 
      onClick={onClickHandler}
      ref={ref}
      id={card._id}
      >
      <img 
        src={ API + card.thumbnailSmall} 
        className={styles.image}
        alt={card.name}
      ></img>
    </div>
  )
}