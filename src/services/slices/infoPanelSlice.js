import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteImage } from '../../utils/api';

export const removeImage = createAsyncThunk(
  'infoPanel/removeImage',
  async (id) => {
    return await deleteImage(id)
      .then(data => data)
      .catch(err => Promise.reject(err))
  }
)

const infoPanelSlice = createSlice({
  name: 'infoPanel',
  initialState: {
    isInfoPanelShow: false,
    
  },
  reducers: {
    setShowInfoPanel(state, action) {
      state.isInfoPanelShow = action.payload
    }
  },
  extraReducers: {
   
  }
 
})

const { actions, reducer } = infoPanelSlice

export const {
  setShowInfoPanel
} = actions

export default reducer 