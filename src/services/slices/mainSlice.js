import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadImage, getImages } from '../../utils/api';

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
      .then(data => data.reverse())
      .catch(err => Promise.reject(err))
  }
)

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    initialCards: [],
    getImagesLoading: false,
    getImagesError: false,
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
    loadedCards: [],
    postCardCuccess: false,
    postCardError: false,
    postCardLoading: false,
    isSubmitButtonDisabled: false
  },
  reducers: {
    setCurrentTab(state, action) {
      state.currentTab = action.payload
      state.clickedCards = []
      state.fade = true
      state.isTabsOpen = false
      state.numberOfSlice = 9
    },
    setFade(state, action) {
      state.fade = action.payload
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
        state.currentCards = state.initialCards.filter(card => card.category.toLowerCase() === state.currentTab.toLowerCase())
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
    },
    filterInitialCards(state, action) {
      state.initialCards = state.initialCards.filter(item => action.payload !== item._id)
    },
    setPostCardSuccessFalse(state, action) {
      state.postCardCuccess = false
    }
  },
  extraReducers: {
    [postImage.fulfilled]: (state, action) => {
      state.postCardCuccess = true
      state.postCardLoading = false
      state.postCardError = false
      state.initialCards = [action.payload, ...state.initialCards]
      state.isSubmitButtonDisabled = false
    },
    [postImage.pending]: (state, action) => {
      state.postCardCuccess = false
      state.postCardLoading = true
      state.postCardError = false
      state.isSubmitButtonDisabled = true
    },
    [postImage.rejected]: (state, action) => {
      state.postCardCuccess = false
      state.postCardLoading = false
      state.postCardError = action.payload
      state.isSubmitButtonDisabled = false

    },
    [getAllImages.fulfilled]: (state, action) => {
      state.initialCards = action.payload
      state.getImagesLoading = false
      state.getImagesError = false
    },
    [getAllImages.pending]: (state, action) => {
      state.getImagesLoading = true
      state.getImagesError = false
    },
    [getAllImages.rejected]: (state, action) => {
      state.getImagesLoading = false
      state.getImagesError = true
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
  setUxHidden,
  filterInitialCards,
  setPostCardSuccessFalse,
  setFade
} = actions

export default reducer 