import styles from './Card.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCards, setCurrentTab, setClikedCards } from '../../services/slices/mainSlice'

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

  function onCardClickHandler() {
    if (width < 1040) return
    if (!isClicked) {
      dispatch(setClikedCards([...clickedCards, card.id]))
    } else {
      dispatch(setClikedCards(clickedCards.filter(c => c !== card.id)))
    }
  }

  return (
    <div className={isClicked ? styles.cardClicked : styles.card} onClick={onCardClickHandler}>
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