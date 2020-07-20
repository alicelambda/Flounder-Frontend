import React, { useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import {
    loadDailies,
    selectDailies,
    addDaily
} from './dailySlice'
import DailyCard from './DailyCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    fab: {
    }

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



export function Daily() {
    const [time, setTime] = React.useState(30);
    const dailies = useSelector(selectDailies);
    const dispatch = useDispatch();
    const classes = useStyles();

    const getTodoData = () => {
        fetch("https://api.alicereuter.com/api/daily/all",{
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
            dispatch(loadDailies(data.todos))
        })
    }
   
    React.useEffect(() => {
        getTodoData()
    },[])
  

    return (
        <div>
            <Fab
            variant="extended"
            color="secondary"
            className={classes.fab}
            aria-label="add"
            >
                Create
            </Fab>
            {dailies.map((data) => <DailyCard data={data} />)}
        </div>
    );
}

export default Daily;
