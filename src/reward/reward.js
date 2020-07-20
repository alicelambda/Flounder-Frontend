import React, { useState } from 'react';
import {
    addReward,
    loadRewards,
    removeReward,
    selectRewards,
} from './rewardSlice'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import RewardCard from './RewardCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
    }, []);

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