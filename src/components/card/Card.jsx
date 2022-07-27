import styles from './Card.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCards, setCurrentTab, setClikedCards, setCurrentCard, setPopupOpen, setPopupFade } from '../../services/slices/mainSlice'

export function Card({card, mainRef, width}) {

  const dispatch = useDispatch()
  const {currentTab, clickedCards} = useSelector(state => state.main)
  const isClicked = clickedCards.some(id => id === card.id)
  
  function onButtonClickHandler(event) {
    event.stopPropagation()

    if (currentTab === card.category) {
      mainRef.current.scrollIntoView({ behavior: "smooth" })
      return
    }

    mainRef.current.scrollIntoView({ behavior: "smooth" })
    dispatch(setCurrentTab(card.category))
    setTimeout(() => {
      dispatch(setCurrentCards())
    }, 200)
  }

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

  return (
    <div className={isClicked ? styles.cardClicked : styles.card} onClick={onCardClick}>
      <img className={styles.image} src={card.image} alt={card.name}/>
      <div className={styles.wrapper}>
        <button 
          className={styles.button} 
          type={'button'}
          onClick={onButtonClickHandler}
        >{card.category}</button>
        <h3 className={styles.name}>{card.name}</h3>
      </div>
    </div>
  )
}