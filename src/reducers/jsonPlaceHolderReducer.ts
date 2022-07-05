import {apiPlaceHolder, getPlaceHolderObjectType} from "../api/apiPlaceHolder";
import {Dispatch} from "redux";
import {RootState} from "../store/store";

export let initialState: Array<getPlaceHolderObjectType> = [
    /*{
        userId: 0,
        id: 0,
        title: 'waiting...',
        body: 'q'
    }*/
]

//Does not work with the uncommented object above

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
        case "EDIT-TITLE":{
            return state.map(el => el.id===action.payload.data.id ? {
                ...el, title:action.payload.data.title, body:action.payload.data.body}:el)
        }
        default:
            return state
    }
}

type tsarType = getPlaceHolderObjectACType
    | postPlaceHolderObjectACType
    | deletePlaceHolderACType
    | editTitleACType

type getPlaceHolderObjectACType = ReturnType<typeof getPlaceHolderObjectAC>

const getPlaceHolderObjectAC = (data: Array<getPlaceHolderObjectType>) => {
    return {
        type: 'GET',
        payload: {
            data
        }
    } as const
}

export const getPlaceHolderObjectThunk = (setProgress: (progress: boolean) => void) => async (dispatch: Dispatch) => {
    try {
        setProgress(true)

        let result = await apiPlaceHolder.get()
        dispatch(getPlaceHolderObjectAC(result.data))
        setProgress(false)

    } catch {
        console.log('vse propalo')
        setProgress(false)
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
export const postPlaceHolderObjectThunk = (payload: { title: string, body: string}, setProgress:(progress:boolean)=>void) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        setProgress(true)
        let result = await apiPlaceHolder.post(payload)
        const postsLength = getState().jphReducer.length
        dispatch(postPlaceHolderObjectAC({...result.data, id: postsLength + 1}))
        setProgress(false)
    } catch {
        console.log('vse propalo')
        setProgress(false)
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

export const deletePlaceHolderObjectThunk = (value:number, setProgress:(progress:boolean)=>void) => async (dispatch: Dispatch) => {
    try {
        setProgress(true)
        let res = await apiPlaceHolder.delete(value)
        dispatch(deletePlaceHolderAC(value))
        console.log(res.data)
        setProgress(false)
    } catch {

        console.log('vse propalo!')
        setProgress(false)
    }
}

const editTitleAC = (data:getPlaceHolderObjectType) => {
    return {
        type:"EDIT-TITLE",
        payload: {
            data
        }

    }as const
}

type editTitleACType = ReturnType<typeof editTitleAC>

export const updateEditTitleThunk = (titleId:number, newTitle:string, setProgress:(progress:boolean)=>void) => async (dispatch:Dispatch) => {
    try {
        setProgress(true)
        let res = await apiPlaceHolder.update(titleId, newTitle)
        console.log(res.data)
        dispatch(editTitleAC(res.data))
        setProgress(false)
    } catch {
        console.log("error")
        setProgress(false)
    }
}