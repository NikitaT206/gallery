import { createSlice } from '@reduxjs/toolkit';
import { cards } from '../../utils/contants';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    initialCards: cards,
    currentCards: [],
    currentTab: 'Show All',
    fade: false,
    numberOfSlice: 9,
    clickedCards: [],
    isTabsOpen: false,
  },
  reducers: {
    setCurrentTab(state, action) {
      state.currentTab = action.payload
      state.clickedCards = []
      state.fade = true
      state.isTabsOpen = false
      state.numberOfSlice = 9
    },
    setCurrentCards(state) {
      if (state.currentTab === 'Show All') {
        state.currentCards = state.initialCards
        state.fade = false
      } else {
        state.currentCards = state.initialCards.filter(card => card.category === state.currentTab)
        state.fade = false
      }
    },
    setNumberOfSlice(state) {
      if (state.numberOfSlice >= state.currentCards.length) return
      state.numberOfSlice += 9
    },
    setClikedCards(state, action) {
      state.clickedCards = action.payload
    },
    setInitialCards(state, action) {
      state.initialCards = action.payload
    },
    setTabsOpen(state, action) {
      state.isTabsOpen = action.payload
    }
  }
})

const { actions, reducer } = mainSlice

export const {
  setCurrentTab,
  setCurrentCards,
  setNumberOfSlice,
  setClikedCards,
  setInitialCards,
  setTabsOpen,
} = actions

export default reducer 