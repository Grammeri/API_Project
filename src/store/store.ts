import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {jsonPlaceHolderReducer} from "../reducers/jsonPlaceHolderReducer";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'

let RootReducer = combineReducers({
    jphReducer: jsonPlaceHolderReducer
})

export type RootReducerType = ReturnType<typeof RootReducer>

export let store = createStore(RootReducer,applyMiddleware(thunk))
/*export type AppDispatch = typeof store.dispatch*/
export type AppDispatch = ThunkDispatch<RootState, unknown,AnyAction>
export type RootState = ReturnType<typeof store.getState>


export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
    >


// export let store = configureStore({
//
//     reducer:{
//         jphReducer: jsonPlaceHolderReducer
//     },
// })

// export type RootState = ReturnType<typeof store.getState>