import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from '../todo/todoSlice';
import { rewardReducer } from '../reward/rewardSlice';
import { dailyReducer } from '../dailies/dailySlice';

export default configureStore({
    reducer: {
        todos: todoReducer,
        rewards: rewardReducer,
        dailies: dailyReducer
    },
});