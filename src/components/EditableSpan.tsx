import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type TitlePropsType = {
    title: string
    callBack: (newTitle: string)=>void

}


export const EditableSpan = (props: TitlePropsType) => {
    const [edit, setEdit]=useState(false)
    let [newTitle, setNewTitle] = useState(props.title)
    let [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const EditHandler = () => {
        setEdit(!edit)
        addTask()
    }


    const addTask = () => {
        const changeTitle = newTitle.trim()
        if (changeTitle.trim() !== "") {
            props.callBack(changeTitle);
        } else {
            setError("Title is required");
        }
    }


    return (
        edit
           ? <input onBlur={EditHandler} autoFocus type="text" onChange={onChangeHandler} value={newTitle}/>
           :  <span onDoubleClick={EditHandler}>{props.title}</span>


    );
};
