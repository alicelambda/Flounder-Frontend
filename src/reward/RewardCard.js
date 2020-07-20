import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import {
    removeReward    
} from './rewardSlice'

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


export default function RewardCard(props) {
    const dispatch = useDispatch();
    const classes = useStyles();


    const removeRewardCard = (rewardid) => {
        dispatch(removeReward(rewardid))
        fetch('https://api.alicereuter.com/api/reward/remove', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: rewardid,
                cookie: props.cookie
            })
        })
    }

    return (
        <Paper className={classes.paper}>
            <Typography color="textPrimary" variant="h6" >{props.data.reward}</Typography>
            <Grid container spacing={3}>
                <Grid item xs={7}>

                </Grid>
                <Grid item xs={3}>
                    <Button
                        onClick={() => removeRewardCard(props.data.id)}
                    >
                        Done
                </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}