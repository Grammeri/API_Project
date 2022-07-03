import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styled from "styled-components";
import {Button} from "./Button";


type HeaderPropsType = {
    addAllShit: (title: string, body:string, userId:number) => void
    delete: (value:number) => void
    userId:1
}

export const Header = (props: HeaderPropsType) => {

    const [newTitle, setNewTitle] = useState("")
    const [newBody, setNewBody] = useState("")
    const [error, setError] = useState<string|boolean>(false)

    const TitleOrPostHandler = () => {
        if (newTitle.trim() !== "" && newBody.trim() == "") {
            setError("Body field must be filled!")
        }
        if (newTitle.trim() == "" && newBody.trim() !== "") {
            setError("Title field must be filled!")
        }
        if (newTitle.trim() == "" && newBody.trim() == "") {
            setError("All fields must be filled!")
        }
        if (newTitle.trim()!=="" && newBody.trim()!=="") {
            props.addAllShit(newTitle, newBody, props.userId);
            if (newTitle !==""){
                setNewTitle("")
            }
            if (newBody !== "") {
                setNewBody("")
            }
        }
    }


    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onBodyChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewBody(e.currentTarget.value)
    }

    const onTitleOrBodyKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError("")
        if (e.key === "Enter") {
            TitleOrPostHandler()

            if (newTitle !== "") {
                setNewTitle("")
            }
            if (newBody !== "") {
                setNewBody("")
            }
        }
    }


    return (
        <HeaderComponent>
           <input type="text" value={newTitle}
                  placeholder={"Title"}
                   onChange={onTitleChangeHandler}
                   onKeyPress={onTitleOrBodyKeyPressHandler}
                  className={error ? "error":""}
            />
            <input type="text" value={newBody}
                   placeholder={"Body"}
                   onChange={onBodyChangeHandler}
                   onKeyPress={onTitleOrBodyKeyPressHandler}
                   className={error ? "error":""}
            />
            <Button callback={TitleOrPostHandler}
                    btnName={"Title or Body"}/>
            {error && <div className={"errorMessage"}>{error}</div>}

        </HeaderComponent>
    );
};


const HeaderComponent = styled.button`
  background: yellow;
  width: 100%;
  height: 100px;
`



