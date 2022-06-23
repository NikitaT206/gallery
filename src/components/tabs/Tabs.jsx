import { useDispatch, useSelector } from 'react-redux'
import { tabs } from '../../utils/contants'
import { Tab } from '../tab/Tab'
import styles from './Tabs.module.css'
import { setTabsOpen } from '../../services/slices/mainSlice'

export function Tabs() {
  const {currentTab, isTabsOpen} = useSelector(state => state.main)
  const dispatch = useDispatch()

  return (
    <>

      <ul className={styles.tabs}>
        {tabs.map((tab, index) => {
          return <Tab tab={tab} key={index}/>
        })}
      </ul>

      <div className={styles.selectTabs}>
        <div className={styles.selectedTab} onClick={() => dispatch(setTabsOpen(!isTabsOpen))}>
          {currentTab}
          <div className={!isTabsOpen ? styles.arrow : styles.arrowReverse}></div>
        </div>

        <ul className={isTabsOpen ? styles.accordeon : styles.accordeonHidden}>
          {tabs.filter(tab => tab !== currentTab).map((tab, index) => {
            return <Tab tab={tab} key={index}/>
          })}
        </ul>
      </div>

    </>
  )
}