import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {apiPlaceHolder, getPlaceHolderObject} from "./api/apiPlaceHolder";

function App() {
    const [data, setData] = useState<Array<getPlaceHolderObject>>([])
    useEffect(() => {
        apiPlaceHolder.get()
            .then(res => {
                setData(res.data)
            })

    }, [])

    return (
        <div>
            {data.map(el => {
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
