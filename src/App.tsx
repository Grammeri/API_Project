import React, {useEffect, useState} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {
    deletePlaceHolderObjectThunk,
    getPlaceHolderObjectThunk,
    postPlaceHolderObjectThunk
} from "./reducers/jsonPlaceHolderReducer";
import {Header} from "./components/Header.";


function App() {
    const dispatch = useAppDispatch()
    const posts = useAppSelector(state => state.jphReducer)

    useEffect(() => {
        dispatch(getPlaceHolderObjectThunk())
    }, [])

    const addPost = (newTitle: string) => {
        debugger
        dispatch(postPlaceHolderObjectThunk({title: newTitle, body: "body", userId: 33}))
    }

    const deleteNum1Btn = (value:number) => {
        dispatch(deletePlaceHolderObjectThunk(value))
    }


    return (
        <div>
            <Header
                addPost={addPost}
                deleteNum1Btn={deleteNum1Btn}
            />
            {posts.map((el) => {
                return (
                    <div>
                        <button onClick={()=>deleteNum1Btn(el.id)}>X</button>
                        <span>{el.id} - </span>
                        <span> {el.title}</span>
                        <span> {el.body}</span>


                    </div>
                )
            })}
        </div>
    );
}

export default App;
