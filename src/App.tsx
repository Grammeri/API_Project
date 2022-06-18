import React, {useEffect, useState} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {getPlaceHolderObjectThunk, postPlaceHolderObjectThunk} from "./reducers/jsonPlaceHolderReducer";
import Header from "./components/Header.";

function App() {
    const dispatch = useAppDispatch()
    const posts=useAppSelector(state => state.jphReducer)


 const [payload,setPayload]=useState(
 {
         title: 'пришло с инпута',
         body: 'bar',
         userId: 1,
     }
 )


    useEffect(() => {
        dispatch(getPlaceHolderObjectThunk())
         }, [])

    const addPost=(newTitle:string)=>{
        setPayload({...payload, title: newTitle, body: "bar", userId: 1})
        dispatch(postPlaceHolderObjectThunk(payload))
    }


    return (
        <div>
            <Header addPost={addPost}/>
            {posts.map((el) => {
                return (
                    <div>
                        <span>{el.id} - </span>
                        <span> {el.title}</span>
                    </div>
                )
            })}
        </div>
    );
}

export default App;
