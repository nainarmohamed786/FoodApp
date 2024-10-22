import {createSlice} from '@reduxjs/toolkit';

const initialState={
    location:[]
};


const LocationReducer=createSlice({
    name:"location",
    initialState,
    reducers:{
        addToLocation:(state,action)=>{
            state.location=action.payload
        }
    }
});


export const {addToLocation}=LocationReducer.actions;

export default LocationReducer.reducer;