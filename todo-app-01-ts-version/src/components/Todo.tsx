import {MdDelete, MdEdit} from "react-icons/md";
import React, {useEffect, useRef, useState} from "react";
import { updateTitle, setEdit, deleteTodo } from "features/todos/todosSlice";
import { useAppDispatch, RootState } from "app/store";
import { useSelector } from "react-redux";


interface TodoProps  {
    id: number,
    title: string,
}


export const Todo = ({id, title}: TodoProps) => {

    const dispatch = useAppDispatch();
    const { edit } = useSelector((state: RootState) => state.todos)

    const [editTitle, setEditTitle] = useState<string>(title);
    const [checkBox, setCheckBox] = useState<boolean>(false);
    
    const editTitleRef = useRef<HTMLInputElement>(null);
    
    function handleChange(event: React.FormEvent<EventTarget> ) {
        const {checked} = event.target as HTMLInputElement;
        setCheckBox(checked);
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
                    onChange={handleChange}
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
                                dispatch(updateTitle({id, newTitle: editTitle}))
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
                    onClick = {() => dispatch(setEdit(true))}
                />
                <MdDelete
                    className="delete-btn"
                    onClick={() => dispatch(deleteTodo(id))}
                />
            </div>
        </div>
    )
}

