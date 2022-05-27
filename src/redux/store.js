import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import cardSlice from './cardSlice'
import marketSlice from './marketSlice';
export default configureStore({
	reducer: {
		todos: todoReducer,
		counter:cardSlice,
		market:marketSlice,
	},
});
