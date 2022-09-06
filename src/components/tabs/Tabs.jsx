import { useDispatch, useSelector } from 'react-redux'
import { Tab } from '../tab/Tab'
import styles from './Tabs.module.css'
import { setTabsOpen } from '../../services/slices/mainSlice'
import { useMemo, useEffect, useState } from 'react'

export function Tabs({mainRef}) {
  const {currentTab, isTabsOpen, initialCards} = useSelector(state => state.main)
  const dispatch = useDispatch()
  const [height, setHeight] = useState(0)


  const tabs = useMemo(() => {
    const category = initialCards.map(item => item.category)
    return [...new Set(['Show All', ...category])]
  }, [initialCards])

  function onTabOpenHandler(event) {
    event.stopPropagation()
    dispatch(setTabsOpen(!isTabsOpen))
  }

  const numberHeight = useMemo(() => tabs.length === 1 ? 0 : (tabs.length - 1) * 37 , [tabs]) 

  useEffect(() => {
    if (numberHeight < 250) {
      setHeight(numberHeight)
    } else {
      setHeight(250)
    }
  }, [numberHeight])

  return (
    <>

      <ul className={styles.tabs}>
        {tabs.map((tab, index) => {
          return <Tab tab={tab} key={index} mainRef={mainRef}/>
        })}
      </ul>

      <div className={styles.selectTabs}>
        <div className={styles.selectedTab} onClick={onTabOpenHandler}>
          {currentTab}
          <div className={!isTabsOpen ? styles.arrow : styles.arrowReverse}></div>
        </div>

        <ul style={isTabsOpen && tabs.length ? {height: `${height}px`} : {height: `${0}px`}} className={isTabsOpen ? styles.accordeon : styles.accordeonHidden}>
          {tabs.filter(tab => tab !== currentTab).map((tab, index) => {
            return <Tab tab={tab} key={index} mainRef={mainRef}/>
          })}
        </ul>
      </div>

    </>
  )
}