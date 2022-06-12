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

export const jsonPlaceHolderReducer = (state= initialState, action:tsarType) =>{
    switch(action.type) {
        case "GET":{
            return [...action.payload.data]
        }
        default: return state
    }
}

type tsarType=getPlaceHolderObjectACType
type getPlaceHolderObjectACType=ReturnType<typeof getPlaceHolderObjectAC>
const getPlaceHolderObjectAC=(data:Array<getPlaceHolderObjectType>)=>{
    return {
        type:'GET',
        payload: {
          data
        }
    }as const
}


export const getPlaceHolderObjectThunk=()=>async(dispatch:Dispatch)=>{
    try{
        let result=await apiPlaceHolder.get()
        console.log(result.data)
        dispatch(getPlaceHolderObjectAC(result.data))
    }
    catch {
        console.log('vse propalo')
    }
}




