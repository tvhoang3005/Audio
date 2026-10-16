import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';

export const fetchSong = createAsyncThunk('song/fetch', async (id) => {
    const { data } = await api.get(`song/${id}`);
    return data;
});

/** Fetches a song unless it is already the one loaded in the player. */
export const fetchSongIfNeeded = (id) => (dispatch, getState) => {
    if (getState().song.data.id !== id) {
        return dispatch(fetchSong(id));
    }
};

const initialState = {
    data: {},
    isFetching: false,
    isPlaying: false,
};

const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        played(state) {
            state.isPlaying = true;
        },
        paused(state) {
            state.isPlaying = false;
        },
        togglePlay(state) {
            state.isPlaying = !state.isPlaying;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSong.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(fetchSong.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isFetching = false;
                state.isPlaying = true;
            })
            .addCase(fetchSong.rejected, (state) => {
                state.isFetching = false;
            });
    },
});

export const { played, paused, togglePlay } = songSlice.actions;

export default songSlice.reducer;
