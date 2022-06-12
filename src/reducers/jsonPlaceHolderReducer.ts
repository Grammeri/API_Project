import {apiPlaceHolder, getPlaceHolderObjectType} from "../api/apiPlaceHolder";
import {Dispatch} from "redux";

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
        case "POST":{
            console.log(action.payload.data)
            return [action.payload.data, ...state]
        }
        default:
            return state
    }
}

type tsarType = getPlaceHolderObjectACType
    | postPlaceHolderObjectACType
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

const postPlaceHolderObjectAC = (data:getPlaceHolderObjectType)=>{
    return {
        type: "POST",
        payload:{
            data
        }
    }as const
}
export const postPlaceHolderObjectThunk = () => async (dispatch: Dispatch) => {
    try {
        let result = await apiPlaceHolder.post()
        dispatch(postPlaceHolderObjectAC(result.data))
    } catch {
        console.log('vse propalo')
    }
}


