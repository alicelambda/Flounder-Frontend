import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux';
import {
    loadDailies,
    selectDailies
} from './dailySlice'
import DailyCard from './DailyCard';
import Fab from '@material-ui/core/Fab';

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



export function Daily() {
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
    });
  

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
