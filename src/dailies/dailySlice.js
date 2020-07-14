import { createSlice } from '@reduxjs/toolkit';

export const dailySlice = createSlice({
    name: 'dailies',
    initialState: [],
    reducers: {
        addDaily: state => {
            return [
                ...state,
                {
                    id:"heello"
                }
            ]
        },
        loadDailies: {
            reducer: (state,action) => {
                return action.payload;

            }
        }
    }
});

export const {addReward,loadRewards} = dailySlice.actions;

export const selectDailies = state =>state.dailies;

export const dailyReducer = dailySlice.reducer;