import styles from './Card.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCard, setPopupOpen, setPopupFade } from '../../services/slices/mainSlice'
import { useMemo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

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
      onClick={onCardClick} 
      style={gridStyle}
    >
      <img className={styles.image} src={card.image} alt={card.name}/>
    </div>
  )
}