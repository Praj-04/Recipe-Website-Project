import {configureStore } from '@reduxjs/toolkit'
import appConfigReducer from './slices/appConfigSlice'
import recipeReducer from './slices/recipeSlice'

export default configureStore({
reducer:{
    appConfigReducer,
    recipeReducer
}
})