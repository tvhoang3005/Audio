import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clearUser, loadUser, saveUser } from '../utils/storage';

// There is no auth backend; this demo account is the only valid login.
export const DEMO_ACCOUNT = {
    email: 'hoangpersievn@gmail.com',
    password: '123',
};

export const logIn = createAsyncThunk(
    'auth/logIn',
    async ({ email, password }, { rejectWithValue }) => {
        if (email !== DEMO_ACCOUNT.email || password !== DEMO_ACCOUNT.password) {
            return rejectWithValue('Invalid email or password');
        }
        // Never persist the password.
        const user = { email };
        saveUser(user);
        return user;
    },
);

export const logOut = () => (dispatch) => {
    clearUser();
    dispatch(loggedOut());
};

const initialState = () => {
    const user = loadUser();
    return {
        isAuthenticated: Boolean(user),
        user,
        isProcessing: false,
    };
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loggedOut(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.pending, (state) => {
                state.isProcessing = true;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.isProcessing = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(logIn.rejected, (state) => {
                state.isProcessing = false;
            });
    },
});

export const { loggedOut } = authSlice.actions;

export default authSlice.reducer;
