import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import styled from "styled-components";

type HeaderPropsType = {
    addPost: (title:string) => void
}


const Header = (props: HeaderPropsType) => {

const [newTitle, setNewTitle]=useState("")

    const onClickHandler = () => {
        props.addPost(newTitle);
        setNewTitle("")
    }
    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
        {setNewTitle(e.currentTarget.value)}
    }
    const onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Enter"){
        onClickHandler()
        setNewTitle("")
    }
    }

    return (
        <HeaderComponent>
            <input type="text"
                   value={newTitle}
            onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>Add Post</button>
        </HeaderComponent>
    );
};

export default Header;

const HeaderComponent = styled.button`
  background: black;
  width: 100%;
  height: 50px;
`