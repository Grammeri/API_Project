import {apiPlaceHolder, getPlaceHolderObjectType} from "../api/apiPlaceHolder";
import {Dispatch} from "redux";
import {RootState} from "../store/store";

let initialState: Array<getPlaceHolderObjectType> = [
    {
        userId: 0,
        id: 0,
        title: 'waiting...',
        body: 'q'
    }
]

export const jsonPlaceHolderReducer = (state = initialState, action: tsarType) => {
    switch (action.type) {
        case "GET": {
            return [...action.payload.data]
        }
        case "POST": {
            console.log(action.payload.data)
            return [action.payload.data, ...state]
        }
        case "DELETE": {

            return state.filter(el=>el.id!==action.payload.value)

        }
        default:
            return state
    }
}

type tsarType = getPlaceHolderObjectACType
    | postPlaceHolderObjectACType
    | deletePlaceHolderACType

type getPlaceHolderObjectACType = ReturnType<typeof getPlaceHolderObjectAC>

const getPlaceHolderObjectAC = (data: Array<getPlaceHolderObjectType>) => {
    return {
        type: 'GET',
        payload: {
            data
        }
    } as const
}

export const getPlaceHolderObjectThunk = () => async (dispatch: Dispatch) => {
    try {
        let result = await apiPlaceHolder.get()
        dispatch(getPlaceHolderObjectAC(result.data))
    } catch {
        console.log('vse propalo')
    }
}

type postPlaceHolderObjectACType = ReturnType<typeof postPlaceHolderObjectAC>

const postPlaceHolderObjectAC = (data: getPlaceHolderObjectType) => {
    return {
        type: "POST",
        payload: {
            data
        }
    } as const
}
export const postPlaceHolderObjectThunk = (payload: { title: string, body: string, userId: number }) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        let result = await apiPlaceHolder.post(payload)
        const postsLength = getState().jphReducer.length
        dispatch(postPlaceHolderObjectAC({...result.data, id: postsLength + 1}))
    } catch {
        console.log('vse propalo')
    }
}

type deletePlaceHolderACType = ReturnType<typeof deletePlaceHolderAC>

const deletePlaceHolderAC = (value:number) => {
    return {
        type: "DELETE",
        payload: {
            value
        }
    } as const
}

export const deletePlaceHolderObjectThunk = (value:number) => async (dispatch: Dispatch) => {
    try {
        let res = await apiPlaceHolder.delete(value)
        dispatch(deletePlaceHolderAC(value))
        console.log(res.data)
    } catch {

        console.log('vse propalo!')
    }
}

const changeTitleAC = (id:number, title:string) => {
    return {
        type:"CHANGE-TITLE",
        payload:{
            id,
            title
        }
    }
}


