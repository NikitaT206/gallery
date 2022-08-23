import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCard, setCurrentCardFade, setFullScreen, setPopupFade, setPopupOpen, setUxHidden } from '../../services/slices/mainSlice'
import { CardSmall } from '../cardSmall/CardSmall'
import { FullViewImage } from '../fullViewImage/fullViewImage'
import styles from './fullViewCards.module.css'

export function FullViewCards() {
  const {currentCard, currentCards} = useSelector(state => state.main)
  const {isPopupOpen} = useSelector(state => state.main)
  const {isPopupFade} = useSelector(state => state.main)
  const {isCurrentCardFade} = useSelector(state => state.main)
  const {isUxHidden} = useSelector(state => state.main)
  const [touchPosition, setTouchPosition] = useState(null)

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

  function toogleUxContainerHidden(event) {
    event.stopPropagation()
    dispatch(setUxHidden(!isUxHidden))
  }

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX

    setTouchPosition(touchDown)
  }

  const handleTouchMove = (e) => {
    if (touchPosition === null) {
      return
    }

    const currentPosition = e.touches[0].clientX
    const direction = touchPosition - currentPosition
  
    if (direction > 10) {
      setNextCard(e)
    }

    if (direction < -10) {
      setPrevCard(e)
    }

    setTouchPosition(null);
  }

  if (!isPopupOpen) {
    return null
  }

  return (
    <div className={isPopupFade ? styles.overlayFade : styles.overlay} onClick={closePopup}>

      <div className={styles.flexContainer}>

        <div className={isUxHidden ? styles.uxContainerHidden : styles.uxContainer}>
          <button className={styles.closeButton} onClick={closePopup}></button>
          <button className={animatePrevButton ? styles.buttonPrevAnimate : styles.buttonPrev} onClick={setPrevCard}></button>
          <button className={animateNextButton ? styles.buttonNextAnimate : styles.buttonNext} onClick={setNextCard}></button>
          <div className={styles.cardsConteiner}>
            {currentCards.map(item => {
              return <CardSmall card={item} key={item.id}/>
            })}
          </div>

          {/* <div className={styles.description}>
            <div>
              <p className={styles.name}>{currentCard.name}</p>
              <p className={styles.category}>{currentCard.category}</p>
            </div>
          </div> */}
        </div>

        {/* <div className={styles.imagesContainer} onClick={toogleUxContainerHidden} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
          {currentCards.map(item => {
            return (
              <FullViewImage image={item} key={item.id}/>
            ) 
          })}
        </div> */}
       
        <div 
          className={isCurrentCardFade ? styles.imageContainerFade : styles.imageContainer} 
          onClick={toogleUxContainerHidden}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
         
          <img src={currentCard.image} className={styles.image}></img>
        </div>
      </div>

     
     

    </div>
  )
}