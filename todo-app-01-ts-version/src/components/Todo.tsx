import {MdDelete, MdEdit} from "react-icons/md";
import React, {useEffect, useRef, useState} from "react";
import { updateTitle, deleteTodo } from "../features/todos/todosSlice";
import { useAppDispatch } from "../app/store";

interface TodoProps  {
    id: number,
    title: string,
}

export const Todo = ({id, title}: TodoProps) => {

    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState<boolean>(false);
    
    const [editTitle, setEditTitle] = useState<string>(title);
    const [checkBox, setCheckBox] = useState<boolean>(false);
    
    const editTitleRef = useRef<HTMLInputElement>(null);
    
    function handleChange(event: React.FormEvent<EventTarget> ) {
        const {checked} = event.target as HTMLInputElement;
        setCheckBox(checked);
    }
    const handleUpdateTitle = () => {
        setEdit(prevEdit => !prevEdit)
        dispatch(updateTitle({id, newTitle: editTitle}))
    }


    useEffect(() => {
        editTitleRef.current?.focus();
    }, [edit]);

    return (

        <div
            className="todos--container"
            style={{backgroundColor: !checkBox ? "#9999ff" : "#ccccb3 "}}
        >
            <div className="left-tods-section">

                <input
                    type="checkbox"
                    name="isChecked"
                    checked={checkBox}
                    onChange={(e) => handleChange(e)}
                />
                {
                    edit ? (
                        <input
                            ref = {editTitleRef}
                            className = "edit-title-input"
                            value = {editTitle}
                            type="text"
                            placeholder={"Edit todo..."}
                            onChange={(e) =>  setEditTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.code === "Enter" && editTitle !== " "){
                                    handleUpdateTitle();
                                }
                            }}
                        />
                    ) : (
                        <p style={{textDecoration: checkBox ? "line-through" : "none"}}>
                            {title}
                        </p>
                    )
                }
            </div>
            <div className="right-tods-section">
            <MdEdit
                    className="edit-btn"
                    onClick = {() => setEdit(prevEdit => !prevEdit)}
                />
                <MdDelete
                    className="delete-btn"
                    onClick={() => dispatch(deleteTodo(id))}
                />
            </div>
        </div>
    )
}

