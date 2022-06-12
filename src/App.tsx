import React, {useEffect, useState} from 'react';
import './App.css';
import {getPlaceHolderObjectType} from "./api/apiPlaceHolder";

function App() {
    // const [data, setData] = useState<Array<getPlaceHolderObjectType>>([])
    // useEffect(() => {
    //     apiPlaceHolder.get()
    //         .then(res => {
    //             setData(res.data)
    //         })
    //
    // }, [])

    const[posts,setPosts]=useState<Array<getPlaceHolderObjectType>>([])

    const getPlaceHolderAPI=async ()=>{
        const  result=await fetch('https://jsonplaceholder.typicode.com/posts');
        const  data = await result.json();
        setPosts(data)
    }

    useEffect(()=>{
        getPlaceHolderAPI()
    },[])

    return (
        <div>
            {posts.map(el => {
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
