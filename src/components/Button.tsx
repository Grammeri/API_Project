import React from 'react';

type ButtonPropsType = {
    callback:()=>void
    btnName:string
}

export const Button = (props:ButtonPropsType) => {
    const onBtnClick= ()=>{
        props.callback()
    }
    return (

            <button onClick={onBtnClick}>{props.btnName}</button>

    );
};

