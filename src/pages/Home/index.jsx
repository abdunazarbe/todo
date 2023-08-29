import React, {useReducer, useState , useMemo , useCallback} from "react";
import {Button} from "flowbite-react";

const index = () => {
    const ints = {
        todo: [],
        taskTitle: "",
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "SET_INPUT":
                return {...state, taskTitle: action.payload};
            case "OK":
                return {
                    ...state,
                    todo: [...state.todo, action.payload],
                };
            case "DELETED":
                return {...state, todo: [...action.payload]};
            case "CLEAR_INPUT":
                return {...state, taskTitle: ""};
        }

        return state;
    };

    const [state, dispatch] = useReducer(reducer, ints);

    const addtask = (e) => {
        const newTask = {
            title: state.taskTitle,
            id: Date.now(),
        };

        if (newTask.title.trim().length > 0) {
            dispatch({type: "OK", payload: newTask});

            dispatch({type: "CLEAR_INPUT"});
        } else {
            alert("Please fill in the task title");
        }
    };

    const removetask = (id) => {
        let latestTodo = state.todo.filter((item) => item.id != id);
        console.log("uchirildi: ", latestTodo);
        dispatch({ type: "DELETED", payload: latestTodo });
        
    };

    return (
        <div className="container">
            <div className="w-2/3 mx-auto my-4 bg-green-200 p-5">
                <div>
                    <label htmlFor="taskname">
                        <p>Enter task title:</p>
                        <input
                            value={state.taskTitle}
                            onChange={(e) => dispatch({type: "SET_INPUT", payload: e.target.value})}
                            type="text"
                            className="w-full"
                        />
                    </label>

                    <Button onClick={() => addtask()} type="submit" className="my-2">
                        add task
                    </Button>
                </div>

                <ul className="bg-white p-3">
                    {state.todo.length &&
                        state.todo?.map((item) => {
                            return (
                                <li className="p-2 flex items-center justify-between  my-2 border-2" key={item.id}>
                                    <span>{item.title} </span>{" "}
                                    <Button onClick={() => removetask(item.id)} gradientDuoTone="purpleToPink">
                                        DELETE
                                    </Button>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
};

export default index;

// const [todo, setTodo] = useState([]);
// const [title, setTitle] = useState("");

// const addtask = (e) => {
//     e.preventDefault();

//     const newTask = {
//         title: title,
//         id: Date.now(),
//     };

//     if (newTask.title.trim().length > 0) {
//         setTodo([...todo, newTask]);
//         setTitle("")
//     }
// };