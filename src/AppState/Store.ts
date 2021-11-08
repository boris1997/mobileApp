import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import rootReducer from './RootReducer'

export type RootState = ReturnType<typeof rootReducer>

//Root reducer registration
const store = configureStore({
    reducer: rootReducer,
})

//registration and export custom hooks and store object
export type AppDispatch = typeof store.dispatch
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector
export default store