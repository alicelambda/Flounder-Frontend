import React from 'react';
import {
    loadRewards,
    selectRewards,
} from './rewardSlice'
import { useSelector, useDispatch } from 'react-redux';
import RewardCard from './RewardCard';
import Fab from '@material-ui/core/Fab';

export default function Reward(props) {
    const rewards = useSelector(selectRewards);
    const dispatch = useDispatch();

    const getRewardData = () => {
        fetch("https://api.alicereuter.com/api/reward/active", {
            method: 'POST',
            headers: {
                Accept: 'applications/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cookie: "DSFDSFD"
            })
        })
            .then(response => response.json())
            .then(data => {
                dispatch(loadRewards(data))
            })
    }

    React.useEffect(() => {
        getRewardData();
    });

    return (
        <div>
            <Fab
                variant="extended"
                color="secondary"
                aria-label="add"
            >
                Create
            </Fab>            {rewards.map((data) => <RewardCard data={data} />)}
        </div>
    )
}