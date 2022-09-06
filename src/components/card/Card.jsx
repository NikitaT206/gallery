import styles from './Card.module.css'
import { useDispatch } from 'react-redux'
import { setCurrentCard, setPopupOpen, setPopupFade } from '../../services/slices/mainSlice'
import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../utils/api'

export function Card({card}) {

  const dispatch = useDispatch()
  const [hide, setHide] = useState(true)
  const navigate  = useNavigate()

  function onCardClick() {
    dispatch(setPopupFade(true))
    dispatch(setCurrentCard(card))
    dispatch(setPopupOpen(true))
    setTimeout(() => {
      dispatch(setPopupFade(false))
      navigate(`/full/${card._id}`)
    }, 300)
  }

  useEffect(() => {
    setHide(false)
  }, [])

  const gridStyle = useMemo(() => { 
    return {
      gridRowEnd: `span ${Math.floor(Math.random() * 5 + 2)}`,
    }
  }, [])

  return (
    <div 
      className={hide ? styles.cardHide : styles.card} 
      style={gridStyle}
    >
      <img 
        onClick={onCardClick} 
        className={styles.image} 
        src={ API + card.thumbnail } 
        alt={card.name}
      />
    </div>
  )
}