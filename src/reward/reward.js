import React, { useState} from 'react';
import {
    addReward,
    loadRewards,
    selectRewards,
} from './rewardSlice'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import RewardCard from './RewardCard';

export default function Reward(props) {
    const rewards = useSelector(selectRewards);

    return (
        <div>
            <button>
                Add
            </button>
            {rewards.map((data) => <RewardCard data={data}/>)}
        </div>
    )
}