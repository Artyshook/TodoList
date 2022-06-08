import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();


    let [todoList, setTodolist] = useState<Array<TodolistType>>( [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState({

        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]

    });


    function removeTask(todolistId: string, taskId: string) {
        setTasks({...tasks , [todolistId] : tasks [todolistId].filter (el => el.id !== taskId)})
        // let filteredTasks = tasks.filter(t => t.id !== id);
        // setTasks(filteredTasks);
    }

    function addTask(todolistId: string, title: string) {
        let newtask = {id: v1(), title: title, isDone: false};
        let newTasks = {...tasks, [todolistId]: [newtask, ...tasks[todolistId]]};
         setTasks(newTasks);

    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks [todolistId].map(el => el.id === taskId ? {...el,isDone} : el) })

        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);

    }

    function removeTodolist(todolistId: string) {
        setTodolist(todoList.filter(el => el.id !== todolistId))
    }


    function changeFilter(todolistId: string, value: FilterValuesType) {
         setTodolist(todoList.map(el => el.id === todolistId ? {...el, filter:value} : el))
    }

    function  addTodoList (newTitle: string) {
        const newId = v1();
       const newTodoList: TodolistType = {id: newId, title: newTitle, filter: "all"};
       setTodolist([newTodoList,...todoList])
        setTasks({...tasks,[newId]:[]});

    }

    function editTodolistTitle (todolistID:string, newTitle: string) {
        console.log(newTitle)

    }

    return (

        <div className="App">
            <AddItemForm callBack={addTodoList}/>
            {todoList.map((el) => {

                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }

                return (
                    <Todolist key={el.id}
                              title= {el.title}
                              todolistId={el.id}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={el.filter}
                              removeTodolist={removeTodolist}
                              editTodolistTitle={editTodolistTitle}
                    />
                )}

            )}

        </div>
    );
}

export default App;
