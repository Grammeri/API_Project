import React, {ChangeEvent, useState} from "react";

type EditableSpanProps = {
    title: string
    editTitle: (id:number, newTitle:string) => void
    id: number
}
export const EditableSpan = (props: EditableSpanProps) => {

    let [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.title)

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        props.editTitle(props.id, newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input value={newTitle}
                     onChange={onChangeHandler}
                     onBlur={onDoubleClickHandler}
                     autoFocus
            />
            : <span onDoubleClick={onDoubleClickHandler}><div style={{"color": "red"}}> This is title:</div>
                {props.title}</span>
    )
}