import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCards, setCurrentTab } from '../../services/slices/mainSlice'
import styles from './Tab.module.css'

export function Tab({tab}) {
  const dispatch = useDispatch()
  const {currentTab} = useSelector(state => state.main)

  function onClickHandler() {
    dispatch(setCurrentTab(tab))
    setTimeout(() => {
      dispatch(setCurrentCards())
    }, 200)
  }

  return (
    <li 
      className={currentTab === tab ? styles.tabActive : styles.tab}
      onClick={onClickHandler}
    >{tab}</li>
  )
}