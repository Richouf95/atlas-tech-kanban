import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthState } from "@/types";

const storedUser = typeof window !== 'undefined' ? localStorage.getItem("atlas-user") : null;
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
    user: parsedUser,
    isAuthenticated: parsedUser !== null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("atlas-user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("atlas-user");
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;