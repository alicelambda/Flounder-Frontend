import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: state => {
            return [
                ...state,
                {
                    id:"heello"
                }
            ]
        },
        loadTodos: {
            reducer: (state,action) => {
                console.log("Loads")
                console.log(action.payload)
                return action.payload;

            }
        }
    }
});

export const {addTodo,loadTodos} = todoSlice.actions;

export const selectTodos = state =>state.todos;

export const todoReducer = todoSlice.reducer;