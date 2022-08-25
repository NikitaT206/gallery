import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCard, setPopupFade, setPopupOpen, setUxHidden } from '../../services/slices/mainSlice'
import { CardSmall } from '../cardSmall/CardSmall'
import styles from './fullViewCards.module.css'

export function FullViewCards() {
  const {currentCard, currentCards} = useSelector(state => state.main)
  const {isPopupOpen} = useSelector(state => state.main)
  const {isPopupFade} = useSelector(state => state.main)
  const {isCurrentCardFade} = useSelector(state => state.main)
  const {isUxHidden} = useSelector(state => state.main)
  const [touchPosition, setTouchPosition] = useState(null)
  const [startPrevAnimation, setStartPrevAnimation] = useState(false)
  const [startNextAnimation, setStartNextAnimation] = useState(false)
  const [animatePrevButton, setAnimatePrevButton] = useState(false)
  const [animateNextButton, setAnimateNextButton] = useState(false)

  const dispatch = useDispatch()

  const prevCard = useMemo(() => {
    let prev = currentCards.find((item, index, arr) => arr.indexOf(item) === arr.indexOf(currentCard) - 1)
    if (!prev) {
     prev = currentCards[currentCards.length - 1]
    }
    return prev
   } , [currentCard])
 
   const nextCard = useMemo(() => {
     let next = currentCards.find((item, index, arr) => arr.indexOf(item) === arr.indexOf(currentCard) + 1)
     if (!next) {
       next = currentCards[0]
     }
     return next
   } , [currentCard])

  function setPrevCard(event) {
    event.stopPropagation()
    setAnimatePrevButton(true)
    setStartPrevAnimation(true)

    setTimeout(() => {
      setStartPrevAnimation(false)
      dispatch(setCurrentCard(prevCard))
      setAnimatePrevButton(false)
    }, 400)
  }

  function setNextCard(event) {
    event.stopPropagation()
    setAnimateNextButton(true)
    setStartNextAnimation(true)

    setTimeout(() => {
      setStartNextAnimation(false)
      dispatch(setCurrentCard(nextCard))
      setAnimateNextButton(false)
    }, 400)
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

  const currentCardStyle = () => {
    if (startNextAnimation) {
      return styles.imageNextAnimated
    } else if (startPrevAnimation) {
      return styles.imagePrevAnimated
    } else {
      return styles.image
    }
  }

  if (!isPopupOpen) {
    return null
  }

  return (
    <div className={isPopupFade ? styles.overlayFade : styles.overlay} onClick={closePopup}>

      <div className={styles.flexContainer}>

        <div className={isUxHidden ? styles.uxContainerHidden : styles.uxContainer}>
          <button 
            className={styles.closeButton} 
            onClick={closePopup}
          ></button>
          <button 
            className={animatePrevButton ? styles.buttonPrevAnimate : styles.buttonPrev} 
            onClick={setPrevCard}
          ></button>
          <button 
            className={animateNextButton ? styles.buttonNextAnimate : styles.buttonNext} 
            onClick={setNextCard}
          ></button>

          <div className={styles.cardsConteiner}>
            {currentCards.map(item => {
              return <CardSmall card={item} key={item.id}/>
            })}
          </div>
        </div>
       
        <div 
          className={isCurrentCardFade ? styles.imageContainerFade : styles.imageContainer} 
          onClick={toogleUxContainerHidden}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <img 
            className={startPrevAnimation ? styles.prevCardAnimated : styles.prevCard} 
            src={prevCard.image}
          ></img>
          <img 
            src={currentCard.image} 
            className={currentCardStyle()}
          ></img>
          <img 
            className={startNextAnimation ? styles.nextCardAnimated : styles.nextCard} 
            src={nextCard.image}
          ></img>
        </div>

      </div>
    </div>
  )
}