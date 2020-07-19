import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider'
import { useSelector, useDispatch } from 'react-redux';
import {
    removeTodo
} from './todoSlice'


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

export default function DailyCard(props) {
    const [time, setTime] = React.useState(30);
    const dispatch = useDispatch();


    const posts = [1]
    var i;
    for (i = 5; i <= 60; i += 5) {
        posts.push(i)
    }


    const mark = posts.map(num => {
        const label = num % 15 ? "" : num.toString(10);
        return {
            value: num,
            label: label
        }

    })
    const marks = mark

    const classes = useStyles();

    const handleSliderChange = (event, newValue) => {
        setTime(newValue);
    };

    const removeMainTodo = (todoid) => {
        dispatch(removeTodo(todoid))
        fetch("https://api.alicereuter.com/api/todo/remove", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: todoid,
                cookie: "aksdl"
            })

        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }

    return (
        <Paper className={classes.paper}>
            <Typography color="textPrimary" variant="h6" >{props.data.title} Due in {props.data.delta}</Typography>
            <Typography>00:00</Typography>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Button>
                        Start
                </Button>
                </Grid>
                <Grid item xs={6}>
                    <Slider
                        min={1}
                        max={60}
                        defaultValue={20}
                        aria-labelledby="discrete-slider-custom"
                        step={null}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        valueLabelFormat={valueLabelFormat}
                        value={typeof time === 'number' ? time : 30}
                        marks={marks}
                        onChange={handleSliderChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button
                    onClick={()=> removeMainTodo(props.data.id)}
                     >
                        Done
                </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}