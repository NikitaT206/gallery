import styles from './infoPanel.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { filterInitialCards } from '../../services/slices/mainSlice'
import { removeImage } from '../../services/slices/infoPanelSlice'
import { setShowInfoPanel } from '../../services/slices/infoPanelSlice'
import { useEffect } from 'react'
import { API } from '../../utils/api'

export function InfoPanel({setNextCard}) {
  const {currentCard} = useSelector(state => state.main)
  const {isInfoPanelShow} = useSelector(state => state.infoPanel)

  const dispatch = useDispatch()

  function onPanelButtonClick() {
    dispatch(setShowInfoPanel(!isInfoPanelShow))
  }

  function deleteImage(event) {
    dispatch(removeImage(currentCard._id))
    dispatch(filterInitialCards(currentCard._id))
    dispatch(setShowInfoPanel(false))
    setNextCard(event)
  }

  useEffect(() => {
    console.log(currentCard);
  }, [])

  return (
    <div className={isInfoPanelShow ? styles.panelContainer : styles.panelContainerHide}>
      <button 
        className={isInfoPanelShow ? styles.buttonBottomRotate : styles.buttonBottom} 
        onClick={onPanelButtonClick}
      ></button>
      <div onClick={(event) => event.stopPropagation()} className={styles.panel}>

        <div className={styles.panelWrapper}>

          <div className={styles.imageDescr}>
            <img className={styles.imageThumb} src={API + currentCard.thumbnail}></img>
            <div className={styles.description}>
              <p className={styles.name}>{currentCard.name}</p>
              <p className={styles.category}>{currentCard.category}</p>
            </div>
          </div>
         
          <p>Upload at: <span>{currentCard.uploadDate}</span></p>
          <button onClick={deleteImage} className={styles.deleteButton}></button>
          {currentCard.exif && (
            <div>
              <p>Model: <span>{currentCard.exif.image.Make + ' ' + currentCard.exif.image.Model}</span></p>
              
              <p>Filmed at: <span>{currentCard.exif.exif.CreateDate}</span></p>
              
              <p>ISO: <span>{currentCard.exif.exif.ISO}</span></p>
              
              <p>Focal Length: <span>{currentCard.exif.exif.FocalLength}</span></p>
              
              <p>Exposure Time: <span>{currentCard.exif.exif.ExposureTime}</span></p>
              
              <p>Aperture Value: <span>{currentCard.exif.exif.ApertureValue.toFixed(1)}</span></p>
              
            </div>
          )}

        </div>
       
      </div>
    </div>
  )
}