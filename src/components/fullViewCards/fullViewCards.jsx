import { useState, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setCurrentCard, setCurrentCards, setPopupFade, setPopupOpen, setUxHidden } from '../../services/slices/mainSlice'
import { API } from '../../utils/api'
import { CardSmall } from '../cardSmall/CardSmall'
import styles from './fullViewCards.module.css'
import { InfoPanel } from '../infoPanel/infoPanel'
import { setShowInfoPanel } from '../../services/slices/infoPanelSlice'

export function FullViewCards() {
  const {currentCard, currentCards, initialCards} = useSelector(state => state.main)
  const {isPopupOpen, isPopupFade, isCurrentCardFade, isUxHidden} = useSelector(state => state.main)
  const {isInfoPanelShow} = useSelector(state => state.infoPanel)

  const [positionX, setPositionX] = useState(null)
  const [positionY, setPositionY] = useState(null)
  const [startPrevAnimation, setStartPrevAnimation] = useState(false)
  const [startNextAnimation, setStartNextAnimation] = useState(false)
  const [animatePrevButton, setAnimatePrevButton] = useState(false)
  const [animateNextButton, setAnimateNextButton] = useState(false)

  const navigate = useNavigate()
  const {id} = useParams()

  const dispatch = useDispatch()

  const prevCard = useMemo(() => {
    let prev = currentCards.find((item, index, arr) => arr.indexOf(item) === arr.indexOf(currentCard) - 1)
    if (!prev) {
     prev = currentCards[currentCards.length - 1]
    }
    return prev
   } , [currentCard, currentCards])
 
   const nextCard = useMemo(() => {
     let next = currentCards.find((item, index, arr) => arr.indexOf(item) === arr.indexOf(currentCard) + 1)
     if (!next) {
       next = currentCards[0]
     }
     return next
   }, [currentCard, currentCards])

  function setPrevCard(event) {
    event.stopPropagation()
    if (currentCards.length < 2) return
    setAnimatePrevButton(true)
    setStartPrevAnimation(true)
    dispatch(setShowInfoPanel(false))
    setTimeout(() => {
      setStartPrevAnimation(false)
      dispatch(setCurrentCard(prevCard))
      setAnimatePrevButton(false)
    }, 400)
  }

  function setNextCard(event) {
    event.stopPropagation()
    if (currentCards.length < 2) return
    setAnimateNextButton(true)
    setStartNextAnimation(true)
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
      navigate(-1)
    }, 250)
  }

  function toogleUxContainerHidden(event) {
    event.stopPropagation()
    dispatch(setUxHidden(!isUxHidden))
  }

  const handleTouchStart = (event) => {
    const {clientX, clientY} = event.touches[0]
    setPositionY(clientY)
    setPositionX(clientX)
  }

  const handleTouchMoveY = (event) => {
    const currentPositionY = event.touches[0].clientY
    const directionY = positionY - currentPositionY

    if (positionY === null) {
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

  const handleTouchMoveX = (event) => {
    const currentPositionX = event.touches[0].clientX
    const directionX = positionX - currentPositionX

    if (positionX === null) {
      return
    }
    if (directionX > 7) {
      setNextCard(event)
    }
    if (directionX < -7) {
      setPrevCard(event)
    }
    setPositionX(null);
  }

  useEffect(() => {
    if (!currentCards.length) {
      closePopup()
    }
  }, [currentCards])

  useEffect(() => {
    dispatch(setCurrentCards())
  }, [initialCards, dispatch])

  useEffect(() => {
    const current = currentCards.find((item) => item._id === id)
    dispatch(setCurrentCard(current))
   }, [])

   useEffect(() => {
    dispatch(setShowInfoPanel(false))
    dispatch(setUxHidden(false))
   }, [dispatch])

  const currentCardStyle = () => {
    if (startNextAnimation) {
      return styles.imageNextAnimated
    } else if (startPrevAnimation) {
      return styles.imagePrevAnimated
    } else if (isInfoPanelShow) {
      return styles.currentImageWithPanel
    }
    return styles.image
  }

  if (!isPopupOpen) {
    return null
  }

  return (
    <div  
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMoveY}
      className={isPopupFade ? styles.overlayFade : styles.overlay} 
    >

      <div className={styles.flexContainer}>

        <div className={isUxHidden ? styles.uxContainerHidden : styles.uxContainer}>
          <button
            className={styles.closeButton} 
            onClick={closePopup}
          ></button>

          {currentCards.length > 1 && (
            <button 
            className={animatePrevButton ? styles.buttonPrevAnimate : styles.buttonPrev} 
            onClick={setPrevCard}
            ></button>
          )}
         
          {currentCards.length > 1 && (
            <button 
            className={animateNextButton ? styles.buttonNextAnimate : styles.buttonNext} 
            onClick={setNextCard}
            ></button>
          )}
         
          <div className={styles.smallCardsContainer}>
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
            alt={prevCard.name}
          ></img>
          <img
            className={currentCardStyle()}
            src={ API + currentCard.image}
            alt={currentCard.name}
          ></img>
          <img 
            className={startNextAnimation ? styles.nextCardAnimated : styles.nextCard} 
            src={ API + nextCard.image}
            alt={nextCard.name}
          ></img>
        </div>

        <InfoPanel setNextCard={setNextCard}/>
       
      </div>
    </div>
  )
}