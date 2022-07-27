import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCard, setCurrentCardFade, setPopupFade, setPopupOpen } from '../../services/slices/mainSlice'
import { CardSmall } from '../cardSmall/CardSmall'
import styles from './fullViewCards.module.css'

export function FullViewCards() {
  const {currentCard, currentCards} = useSelector(state => state.main)
  const {isPopupOpen} = useSelector(state => state.main)
  const {isPopupFade} = useSelector(state => state.main)
  const {isCurrentCardFade} = useSelector(state => state.main)
  const dispatch = useDispatch()

  const [animatePrevButton, setAnimatePrevButton] = useState(false)
  const [animateNextButton, setAnimateNextButton] = useState(false)

  function setPrevCard(event) {
    event.stopPropagation()
    dispatch(setCurrentCardFade(true))
    setAnimatePrevButton(true)
    let prev = currentCards.find((item, index, array) => array.indexOf(item) === array.indexOf(currentCard) - 1)
    if (!prev) {
      prev = currentCards[currentCards.length - 1]
    }
    setTimeout(() => {
      dispatch(setCurrentCard(prev))
      dispatch(setCurrentCardFade(false))
      setAnimatePrevButton(false)
    }, 200)
  }

  function setNextCard(event) {
    event.stopPropagation()
    dispatch(setCurrentCardFade(true))
    setAnimateNextButton(true)
    let next = currentCards.find((item, index, array) => array.indexOf(item) === array.indexOf(currentCard) + 1)
    if (!next) {
      next = currentCards[0]
    }
    setTimeout(() => {
      dispatch(setCurrentCard(next))
      dispatch(setCurrentCardFade(false))
      setAnimateNextButton(false)
    }, 200)
  }

  function closePopup() {
    dispatch(setPopupFade(true))
    setTimeout(() => {
      dispatch(setPopupFade(false))
      dispatch(setPopupOpen(false))
      dispatch(setCurrentCard(null))
    }, 300)
  }

  if (!isPopupOpen) {
    return null
  }

  return (
    <div className={isPopupFade ? styles.overlayFade : styles.overlay} onClick={closePopup}>

      <div className={styles.flexContainer}>
        <button className={animatePrevButton ? styles.buttonPrevAnimate : styles.buttonPrev} onClick={setPrevCard}></button>
        <div className={isCurrentCardFade ? styles.imageContainerFade : styles.imageContainer} onClick={(event) => event.stopPropagation()}>
          <div className={styles.description}>
            <p className={styles.name}>{currentCard.name}</p>
            <p className={styles.category}>{currentCard.category}</p>
          </div>
          <img src={currentCard.image} className={styles.image}></img>
        </div>
        <button className={animateNextButton ? styles.buttonNextAnimate : styles.buttonNext} onClick={setNextCard}></button>
      </div>

      <div className={styles.cardsConteiner}>
        {currentCards.map(item => {
          return <CardSmall card={item} key={item.id}/>
        })}
      </div>

    </div>
  )
}