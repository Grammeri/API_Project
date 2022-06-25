import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {
    deletePlaceHolderObjectThunk,
    getPlaceHolderObjectThunk,
    postPlaceHolderObjectThunk, updateTitleThunk
} from "./reducers/jsonPlaceHolderReducer";
import {Header} from "./components/Header"
import {Button} from "./components/Button";


function App() {
    const dispatch = useAppDispatch()
    const posts = useAppSelector(state => state.jphReducer)

    useEffect(() => {
        dispatch(getPlaceHolderObjectThunk())
    }, [])

    const addAllShit = (newTitle: string, newBody:string) => {
        debugger
        dispatch(postPlaceHolderObjectThunk({title: newTitle, body: newBody, userId: 1}))
    }

    const deleteBtn = (value:number) => {
        dispatch(deletePlaceHolderObjectThunk(value))
    }

    const changeTitle = ()=>{
        dispatch(updateTitleThunk())
    }

    let userId=1

    return (
        <div>
            <Header
                addAllShit={addAllShit}
                delete={deleteBtn}
                userId={userId}
                changeTitle={changeTitle}
                title={"NewTitle"}

            />
            {posts.map((el) => {

                return (
                    <div>
                        <Button callback={()=>deleteBtn(el.id)} btnName={"X"}/>
                        <span>{el.id} - </span>
                        <span><div style={{"color":"red"}}> This is title:</div>{el.title}</span>
                        <span><div style={{"color":"lightblue"}}> This is body: </div>{el.body}</span>
                    </div>
                )
            })}
        </div>
    );
}

export default App;
