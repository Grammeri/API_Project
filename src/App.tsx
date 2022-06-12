import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {getPlaceHolderObjectThunk, postPlaceHolderObjectThunk} from "./reducers/jsonPlaceHolderReducer";
import Header from "./components/Header.";

function App() {
    const dispatch = useAppDispatch()
    const posts=useAppSelector(state => state.jphReducer)

    useEffect(() => {
        dispatch(getPlaceHolderObjectThunk())
         }, [])

    const addPost=()=>{
        dispatch(postPlaceHolderObjectThunk())
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
