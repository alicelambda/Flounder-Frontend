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
        },
        removeDaily: {
            reducer : (state,action) => {
                return state.filter((x) => action.payload !== x.id)
            }
        }
    }
});

export const {removeDaily,loadDailies, addDaily} = dailySlice.actions;

export const selectDailies = state =>state.dailies;

export const dailyReducer = dailySlice.reducer;