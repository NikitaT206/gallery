import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadImage, getImages } from '../../utils/api';
import { cards } from '../../utils/contants';

export const postImage = createAsyncThunk(
  'main/postImage',
  async (formData) => {
    return await uploadImage(formData)
      .then(data => data)
      .catch(err => Promise.reject(err))
  }
)

export const getAllImages = createAsyncThunk(
  'main/getImages',
  async () => {
    return await getImages()
      .then(data => data)
      .catch(err => Promise.reject(err))
  }
)

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    initialCards: cards,
    currentCards: [],
    currentCard: null,
    currentTab: 'Show All',
    fade: false,
    numberOfSlice: 9,
    isTabsOpen: false,
    isCurrentCardFade: false,
    isPopupOpen: false,
    isPopupFade: false,
    isFullScreen: false,
    isUxHidden: false,
    loadedCards: []
  },
  reducers: {
    setCurrentTab(state, action) {
      state.currentTab = action.payload
      state.clickedCards = []
      state.fade = true
      state.isTabsOpen = false
      state.numberOfSlice = 9
    },
    setCurrentCard(state, action) {
      state.currentCard = action.payload
    },
    setCurrentCardFade(state, action) {
      state.isCurrentCardFade = action.payload
    },
    setPopupOpen(state, action) {
      state.isPopupOpen = action.payload
    },
    setPopupFade(state, action) {
      state.isPopupFade = action.payload
    },
    setFullScreen(state, action) {
      state.isFullScreen = action.payload
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
    setInitialCards(state, action) {
      state.initialCards = action.payload
    },
    setTabsOpen(state, action) {
      state.isTabsOpen = action.payload
    },
    setUxHidden(state, action) {
      state.isUxHidden = action.payload
    }
  },
  extraReducers: {
    [postImage.fulfilled]: (state, action) => {
      console.log(action.payload)
    },
    [getAllImages.fulfilled]: (state, action) => {
      state.loadedCards = action.payload
    }
  }
 
})

const { actions, reducer } = mainSlice

export const {
  setCurrentTab,
  setCurrentCards,
  setNumberOfSlice,
  setInitialCards,
  setTabsOpen,
  setCurrentCard,
  setPopupOpen,
  setPopupFade,
  setCurrentCardFade,
  setFullScreen,
  setUxHidden
} = actions

export default reducer 