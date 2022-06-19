import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styled from "styled-components";

type HeaderPropsType = {
    addPost: (title: string) => void
    deleteNum1Btn: (value:number) => void
}

export const Header = (props: HeaderPropsType) => {

    const [newTitle, setNewTitle] = useState("")


    const onPostClickHandler = () => {
        props.addPost(newTitle);
        setNewTitle("")
    }

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }


    const onTitleKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onPostClickHandler()
            setNewTitle("")
        }
    }

    const deleteBtn = () => {
        props.deleteNum1Btn(1)
    }
    return (
        <HeaderComponent>
            <button onClick={deleteBtn}>Delete Num 1</button>
            <input type="text" value={newTitle}
                   onChange={onTitleChangeHandler}
                   onKeyPress={onTitleKeyPressHandler}
            />


            <button onClick={onPostClickHandler}>Add Post</button>


        </HeaderComponent>
    );
};


const HeaderComponent = styled.button`
  background: black;
  width: 100%;
  height: 50px;
`



