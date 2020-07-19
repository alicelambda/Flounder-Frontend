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
                return action.payload;
            }
        },
        removeTodo: {
            reducer : (state,action) => {
                return state.filter((x) => action.payload !== x.id)
            }
        }

    }
});

export const {addTodo,loadTodos, removeTodo} = todoSlice.actions;

export const selectTodos = state =>state.todos;

export const todoReducer = todoSlice.reducer;