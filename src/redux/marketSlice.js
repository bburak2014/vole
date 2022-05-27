import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
  
export const getMarketAsync = createAsyncThunk(
	'market/getMarketAsync',
	async () => {
		const resp = await fetch('http://challenge.vole.io/cards/market');
		if (resp.ok) {
			const market = await resp.json();
			return { market };
		}
	}
);


export const marketSlice = createSlice({
	name: 'market',
	initialState: [],
	 
	extraReducers: {
		[getMarketAsync.fulfilled]: (state, action) => {
			return action.payload.market;
		}
		
	},
});
 



export const { addMarket, deleteMarket } = marketSlice.actions;
 
export default marketSlice.reducer;
