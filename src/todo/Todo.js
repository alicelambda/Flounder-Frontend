import React, { useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import {
    addTodo,
    selectTodos,
    loadTodos
} from './todoSlice'
import TodoCard from './TodoCard';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function valuetext(value) {
    return `${value}°C`;
}


function valueLabelFormat(x) {
    var coin
    if (x < 25) {
        coin = 3 * x + 15;
    } else if (x < 55) {
        coin = 2 * x + 40;
    } else {
        coin = x + 95;
    }
    return `${coin} `;
}



export function Todo() {
    const [time, setTime] = React.useState(30);
    const todo = useSelector(selectTodos);
    const dispatch = useDispatch();
   
    React.useEffect(() => {
        dispatch(loadTodos([1,23,3]))
    },[])
  

    return (
        <div>
            <button
            onClick={() => dispatch(addTodo())}
            >
                Add
            </button>
            {todo.map(() => <TodoCard/>)}
        </div>
    );
}

export default Todo;
