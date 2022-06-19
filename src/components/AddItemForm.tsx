import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type AddTaskFormPropsType = {
    callBack: (title: string)=> void
}

export const AddItemForm = (props:AddTaskFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "enter") {
            addItem();
        }
    }

    const addItem = () => {
        const itemTitle = title.trim()
        if (itemTitle.trim() !== "") {
            props.callBack(itemTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return (
        <div>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />

                <button onClick={addItem}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

