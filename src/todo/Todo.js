import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectTodos,
    loadTodos
} from './todoSlice'
import TodoCard from './TodoCard';
import Fab from '@material-ui/core/Fab';
import NewTodo from './NewTodo'




export function Todo() {
    const todo = useSelector(selectTodos);
    const [open,setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const getTodoData = () => {
        fetch("https://api.alicereuter.com/api/todo/all",{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cookie: "TESTCOOKIE"
            })
        })
        .then(response => response.json())
        .then(data => {
            dispatch(loadTodos(data.todos))
        })
    }
   
    React.useEffect(() => {
        getTodoData()
    })

    const handleClose = (value) => {
        setOpen(false);
      };
  

    return (
        <div>
             <Fab
            variant="extended"
            color="secondary"
            aria-label="add"
            onClick={() => setOpen(true)}

            >
                Create
            </Fab>
            <NewTodo 
               open={open}
               onClose={handleClose}
            />
            {todo.map((data) => <TodoCard data={data} />)}
        </div>
    );
}

export default Todo;
