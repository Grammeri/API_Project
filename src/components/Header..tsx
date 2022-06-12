import React from 'react';
import styled from "styled-components";

type HeaderPropsType = {
    addPost: () => void
}


const Header = (props: HeaderPropsType) => {

    const onClickHandler = () => {
        props.addPost()
    }

    return (
        <HeaderComponent>
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