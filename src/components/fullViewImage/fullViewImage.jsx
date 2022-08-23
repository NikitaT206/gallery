import styles from './fullViewImage.module.css'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCard, setCurrentCardFade } from '../../services/slices/mainSlice'
import { useState } from 'react'

export function FullViewImage({image}) {

  const {currentCard, currentCards} = useSelector(state => state.main)
  const dispatch = useDispatch()
  const ref = useRef()

  // useEffect(() => {

  //   const observer = new IntersectionObserver(([entry]) => {
     
  //     if (entry.isIntersecting) {
  //       const current = currentCards.find(item => item.id == entry.target.id)
  //       ref.current.scrollIntoView({ behavior: "smooth" })

  //       console.log(ref.current);
  //       // dispatch(setCurrentCard(current))

  //     }

  //   } , {threshold: .3})

  //   if (ref.current) {
  //     observer.observe(ref.current)
  //   } 

  //   return () => {
  //     if (ref.current) {
  //       observer.unobserve(ref.current)
  //     }
  //   }
  // }, [ref])

  // useEffect(() => {
  //   if (currentCard.id == ref.current.id) {
  //     ref.current.scrollIntoView({ behavior: "smooth" })
  //   }
  // }, [currentCard])

  return (
    <div className={styles.imageFullBackground} ref={ref} id={image.id}>
      <img className={styles.imageFull} src={image.image}></img>
    </div>
  )

}