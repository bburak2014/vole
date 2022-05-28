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
			const todo = {
				id: nanoid(),
				photoUrl: action.payload.photoUrl,
				price: action.payload.price,
				cardType: action.payload.cardType,
				name: action.payload.name,
				position: action.payload.position,
				team: action.payload.team,
				attributes: action.payload.attributes,
			};

			state.push(todo);

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
