import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCard, setPopupFade, setPopupOpen, setUxHidden } from '../../services/slices/mainSlice'
import { API } from '../../utils/api'
import { CardSmall } from '../cardSmall/CardSmall'
import styles from './fullViewCards.module.css'
import { useEffect } from 'react'
import { InfoPanel } from '../infoPanel/infoPanel'
import { setShowInfoPanel } from '../../services/slices/infoPanelSlice'

export function FullViewCards() {
  const {currentCard, currentCards} = useSelector(state => state.main)
  const {isPopupOpen} = useSelector(state => state.main)
  const {isPopupFade} = useSelector(state => state.main)
  const {isCurrentCardFade} = useSelector(state => state.main)
  const {isUxHidden} = useSelector(state => state.main)
  const {isInfoPanelShow} = useSelector(state => state.infoPanel)

  const [touchPosition, setTouchPosition] = useState(null)
  const [startPrevAnimation, setStartPrevAnimation] = useState(false)
  const [startNextAnimation, setStartNextAnimation] = useState(false)
  const [animatePrevButton, setAnimatePrevButton] = useState(false)
  const [animateNextButton, setAnimateNextButton] = useState(false)
  const [positionY, setPositionY] = useState(null)
  const [showPanel, setShowPanel] = useState(false)

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
    setShowPanel(false)
    dispatch(setShowInfoPanel(false))
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
    setShowPanel(false)
    dispatch(setShowInfoPanel(false))
    setTimeout(() => {
      setStartNextAnimation(false)
      dispatch(setCurrentCard(nextCard))
      setAnimateNextButton(false)
    }, 400)
  }

  function closePopup() {
    dispatch(setPopupFade(true))
    dispatch(setShowInfoPanel(false))
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
    const {clientX, clientY} = e.touches[0]
    setPositionY(clientY)
    setTouchPosition(clientX)
  }

  const handleTouchMove = (e) => {
    const currentPositionY = e.touches[0].clientY
    const directionY = positionY - currentPositionY

    if (touchPosition === null || positionY === null) {
      return
    }

    if (directionY > 10) {
      dispatch(setShowInfoPanel(true))
    }

    if (directionY < -5) {
      dispatch(setShowInfoPanel(false))

    }
    setPositionY(null)
  }

  const handleTouchMoveX = (e) => {
    const currentPositionX = e.touches[0].clientX
    const directionX = touchPosition - currentPositionX

    if (touchPosition === null) {
      return
    }

    if (directionX > 7) {
      setNextCard(e)
    }

    if (directionX < -7) {
      setPrevCard(e)
    }

    setTouchPosition(null);
  }

  const handleTouchEnd = (e) => {
    // e.preventDefault()
    // setPosition(null)
  }

  useEffect(() => {
    if (!currentCards.length) {
      closePopup()
    }
  }, [currentCards])

  const currentCardStyle = () => {
    if (startNextAnimation) {
      return styles.imageNextAnimated
    } else if (startPrevAnimation) {
      return styles.imagePrevAnimated
    } else if (isInfoPanelShow) {
      return styles.currentCardPanel
    }
    return styles.image
  }

  if (!isPopupOpen) {
    return null
  }

  return (
    <div  
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd} 
      className={isPopupFade ? styles.overlayFade : styles.overlay} 
    >

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
              return <CardSmall card={item} key={item._id}/>
            })}
          </div>
        </div>
       
        <div 
          className={isCurrentCardFade ? styles.imageContainerFade : styles.imageContainer} 
          onClick={toogleUxContainerHidden}
          onTouchMove={handleTouchMoveX}
          onTouchStart={handleTouchStart}
        >
          <img 
            className={startPrevAnimation ? styles.prevCardAnimated : styles.prevCard} 
            src={ API + prevCard.image}
          ></img>
          <img 
            src={ API + currentCard.image} 
            className={currentCardStyle()}
          ></img>
          <img 
            className={startNextAnimation ? styles.nextCardAnimated : styles.nextCard} 
            src={ API + nextCard.image}
          ></img>
        </div>
        <InfoPanel setNextCard={setNextCard}/>
       

      </div>
    </div>
  )
}