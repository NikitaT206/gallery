import styles from './infoPanel.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { filterInitialCards, setCurrentCards } from '../../services/slices/mainSlice'
import { removeImage } from '../../services/slices/infoPanelSlice'
import { setShowInfoPanel } from '../../services/slices/infoPanelSlice'
import { API } from '../../utils/api'

export function InfoPanel({setNextCard}) {
  const {currentCard} = useSelector(state => state.main)
  const {isInfoPanelShow} = useSelector(state => state.infoPanel)
  const [confirmButtonsShow, setConfirmButtonsShow] = useState(false)

  const dispatch = useDispatch()

  function onPanelButtonClick() {
    dispatch(setShowInfoPanel(!isInfoPanelShow))
  }

  function deleteImage(event) {
    setConfirmButtonsShow(false)
    dispatch(removeImage(currentCard._id))
    dispatch(filterInitialCards(currentCard._id))
    dispatch(setCurrentCards())
    dispatch(setShowInfoPanel(false))
    setNextCard(event)
  }

  return (
    <div className={isInfoPanelShow ? styles.panelContainer : styles.panelContainerHide}>

      <button 
        className={isInfoPanelShow ? styles.buttonBottomRotate : styles.buttonBottom} 
        onClick={onPanelButtonClick}
      ></button>

      <div 
        onClick={(event) => event.stopPropagation()} 
        className={styles.panel}
      >

        <div className={styles.panelWrapper}>

          <div className={styles.imageDescription}>
            <img 
              className={styles.imageThumbnail} 
              src={API + currentCard.thumbnailSmall}
              alt={currentCard.name}
            ></img>
            <div className={styles.description}>
              <p className={styles.name}>{currentCard.name}</p>
              <p className={styles.category}>{currentCard.category}</p>
            </div>

            <div className={styles.buttonsContainer}>
              <div className={styles.deleteButtonCOntainer}>
                <div className={confirmButtonsShow ? styles.confirmButtons : styles.confirmButtonsHide}>
                  <button 
                    className={styles.confirmButton} 
                    onClick={deleteImage}
                  ></button>
                  <button 
                    className={styles.cancelButton} 
                    onClick={() => setConfirmButtonsShow(false)}
                  ></button>
                </div>
                <button 
                  onClick={() => setConfirmButtonsShow(!confirmButtonsShow)} 
                  className={styles.deleteButton}
                ></button>
              </div>
              <a 
                href={API + currentCard.fullImage} 
                className={styles.linkButton} 
                download={'currentCard.fullImage'} 
                target={'_blank'}
                rel="noreferrer"
              ></a>
            </div>

          </div>
         
          <p className={styles.charItemFirst}>Upload at: 
            <span className={styles.charDesc}>{currentCard.uploadDate}</span>
          </p>

          {currentCard.exifData && currentCard.exifData.exif && (
            <ul className={styles.charList} onTouchMove={event => event.stopPropagation()}>
              {currentCard.exifData.image.Make && currentCard.exifData.image.Model && (
                <li className={styles.charItem}>Model: 
                  <span className={styles.charDesc}>{currentCard.exifData.image.Make + ' ' + currentCard.exifData.image.Model}</span>
                </li>
              )}
              {currentCard.exifData.exif.DateTimeOriginal && (
                <li className={styles.charItem}>Filmed at: 
                  <span className={styles.charDesc}>{currentCard.exifData.exif.DateTimeOriginal}</span>
                </li>
              )}
              {currentCard.exifData.exif.ISO && (
                <li className={styles.charItem}>ISO: 
                  <span className={styles.charDesc}>{currentCard.exifData.exif.ISO}</span>
                </li>
              )}

              {currentCard.exifData.exif.FocalLength && (
                <li className={styles.charItem}>Focal Length: 
                  <span className={styles.charDesc}>{currentCard.exifData.exif.FocalLength}</span>
                </li>
              )}
              
              {currentCard.exifData.exif.ExposureTime && (
                <li className={styles.charItem}>Exposure Time: 
                  <span className={styles.charDesc}>{currentCard.exifData.exif.ExposureTime}</span>
                </li>
              )}
              
              {currentCard.exifData.exif.ApertureValue && (
                <li className={styles.charItem}>Aperture Value: 
                  <span className={styles.charDesc}>{currentCard.exifData.exif.ApertureValue}</span>
                </li>
              )}
              
            </ul>
          )}
        </div>   
      </div>
    </div>
  )
}