import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: 0,
    reducers: {
        updateConuter: (state, action) => {
            // Directly update the state based on the action's payload
            if (action.payload === "+") {
                return state + 1;  // Increment the state by 1
            } else if (action.payload === "-") {
                return state - 1;  // Decrement the state by 1
            }
            return state;  // Return current state if action payload is neither "+" nor "-"
        }
    }
});

export const { updateConuter } = counterSlice.actions;
export default counterSlice.reducer;
