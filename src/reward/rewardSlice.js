import { createSlice } from '@reduxjs/toolkit';

export const rewardSlice = createSlice({
    name: 'rewards',
    initialState: [],
    reducers: {
        addReward: state => {
            return [
                ...state,
                {
                    id:"heello"
                }
            ]
        },
        loadRewards: {
            reducer: (state,action) => {
                return action.payload;

            }
        }
    }
});

export const {addReward,loadRewards} = rewardSlice.actions;

export const selectRewards = state =>state.rewards;

export const rewardReducer = rewardSlice.reducer;