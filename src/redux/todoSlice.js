import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
 
export const getTodosAsync = createAsyncThunk(
	'todos/getTodosAsync',
	async () => {
		const resp = await fetch('http://challenge.vole.io/cards/mycards');
		if (resp.ok) {
			const todos = await resp.json();
			return { todos };
		}
	}
);


export const todoSlice = createSlice({
	name: 'todos',
	initialState: [],
	reducers: {
		addTodo: (state, action) => {
			// const todo = {
			// 	id: nanoid()
			// 	[action.payload]
 			// }
			state.push(action.payload);
		},
		toggleComplete: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			state[index].completed = action.payload.completed;
		},
		deleteTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
		CategoryTodo: (state, action) => {
			return state.filter((todo) => todo.cardType === action.payload.cardType);
		},
	},
	extraReducers: {
		[getTodosAsync.fulfilled]: (state, action) => {
			return action.payload.todos;
		}
		
	},
});
 



export const { addTodo, toggleComplete, deleteTodo,CategoryTodo } = todoSlice.actions;
 
export default todoSlice.reducer;
