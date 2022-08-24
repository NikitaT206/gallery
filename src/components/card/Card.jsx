import styles from './Card.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCards, setCurrentTab, setClikedCards, setCurrentCard, setPopupOpen, setPopupFade } from '../../services/slices/mainSlice'
import { useMemo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export function Card({card, mainRef, index}) {

  const dispatch = useDispatch()
  const {currentTab, clickedCards, currentCards} = useSelector(state => state.main)
  const isClicked = clickedCards.some(id => id === card.id)
  const [hide, setHide] = useState(true)
  
  // function onButtonClickHandler(event) {
  //   event.stopPropagation()

  //   if (currentTab === card.category) {
  //     mainRef.current.scrollIntoView({ behavior: "smooth" })
  //     return
  //   }

  //   mainRef.current.scrollIntoView({ behavior: "smooth" })
  //   dispatch(setCurrentTab(card.category))
  //   setTimeout(() => {
  //     dispatch(setCurrentCards())
  //   }, 200)
  // }

  // function onCardClickHandler() {
  //   if (width < 1040) return
  //   if (!isClicked) {
  //     dispatch(setClikedCards([...clickedCards, card.id]))
  //   } else {
  //     dispatch(setClikedCards(clickedCards.filter(c => c !== card.id)))
  //   }
  // }

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
      // gridRowStart: `span ${Math.floor(Math.random() * 5 + 1)}`,
      gridRowEnd: `span ${Math.floor(Math.random() * 5 + 2)}`,
      // gridColumnStart: `span ${Math.floor(Math.random() * 5 + 2)}`,
      // gridColumnEnd: `span ${Math.floor(Math.random() * 3 + 2)}` 
    }
  }, [currentCards])

  return (
    <div className={hide ? styles.cardHide : styles.card} onClick={onCardClick} style={gridStyle}>
      <img className={styles.image} src={card.image} alt={card.name}/>
      {/* <div className={styles.wrapper}>
        <button 
          className={styles.button} 
          type={'button'}
          onClick={onButtonClickHandler}
        >{card.category}</button>
        <h3 className={styles.name}>{card.name}</h3>
      </div> */}
    </div>
  )
}