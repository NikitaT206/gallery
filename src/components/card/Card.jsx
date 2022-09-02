import styles from './Card.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCard, setPopupOpen, setPopupFade, removeImage, filterInitialCards } from '../../services/slices/mainSlice'
import { useMemo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { API } from '../../utils/api'

export function Card({card}) {

  const dispatch = useDispatch()
  const {currentCards} = useSelector(state => state.main)
  const [hide, setHide] = useState(true)

  function onCardClick() {
    dispatch(setPopupFade(true))
    dispatch(setCurrentCard(card))
    dispatch(setPopupOpen(true))
    setTimeout(() => {
      dispatch(setPopupFade(false))
    }, 300)
  }

  useEffect(() => {
    setHide(false)
  }, [])

  const gridStyle = useMemo(() => { 
    return {
      gridRowEnd: `span ${Math.floor(Math.random() * 5 + 2)}`,
    }
  }, [currentCards])

  return (
    <div 
      className={hide ? styles.cardHide : styles.card} 
      style={gridStyle}
    >
      <img onClick={onCardClick} className={styles.image} src={ API + card.thumbnail } alt={card.name}/>
    </div>
  )
}