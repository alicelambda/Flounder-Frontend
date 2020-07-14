import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from '../todo/todoSlice';
import { rewardReducer } from '../reward/rewardSlice';

export default configureStore({
    reducer: {
        todos: todoReducer,
        rewards: rewardReducer,
    },
});