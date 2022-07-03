import React, {useEffect, useState} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {
    deletePlaceHolderObjectThunk,
    getPlaceHolderObjectThunk,
    postPlaceHolderObjectThunk,
    updateEditTitleThunk
} from "./reducers/jsonPlaceHolderReducer";
import {Header} from "./components/Header"
import {Button} from "./components/Button";
import {EditableSpan} from "./EditableSpan";


function App() {
    const dispatch = useAppDispatch()
    const posts = useAppSelector(state => state.jphReducer)
    const[progress,setProgress]=useState(false)

    useEffect(() => {
        dispatch(getPlaceHolderObjectThunk())
    }, [])

    const addAllShit = (newTitle: string, newBody:string) => {

        dispatch(postPlaceHolderObjectThunk({title: newTitle, body: newBody}))
    }

    const deleteBtn = (value:number) => {
        dispatch(deletePlaceHolderObjectThunk(value))
    }

/*    const updateBtn = (id:number)=>{
        dispatch(updateTitleThunk(id))
    }*/

    const editTitle = (titleId:number, newTitle:string)=>{
        dispatch(updateEditTitleThunk(titleId, newTitle))
    }
const editTitleHandler = (titleId:number, newTitle:string) =>{
        editTitle(titleId, newTitle)
}



    return (
        <div>
            <Header
                addAllShit={addAllShit}
                // delete={deleteBtn}
                // userId={1}
            />
            {posts.map((el) => {

                return (
                    <div>
                        <Button callback={()=>deleteBtn(el.id)} btnName={"X"}/>
                        <span>{el.id} - </span>
                       {/* <span><div style={{"color":"red"}}> This is title:</div>{el.title}</span>*/}
                        <EditableSpan editTitle={editTitleHandler} id={el.id} title={el.title}/>
                        <Button callback={()=>editTitle(el.id, el.title)} btnName={"Update"}/>
                        <span><div style={{"color":"lightblue"}}> This is body: </div>{el.body}</span>
                    </div>
                )
            })}
        </div>
    );
}

export default App;


