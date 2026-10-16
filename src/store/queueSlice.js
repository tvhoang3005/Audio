import { createSlice } from '@reduxjs/toolkit';
import { fetchSong } from './songSlice';

const initialState = {
    queue: [],
    isOpen: false,
};

const addIfMissing = (state, song) => {
    if (!state.queue.some((item) => item.id === song.id)) {
        state.queue.push(song);
    }
};

const queueSlice = createSlice({
    name: 'queue',
    initialState,
    reducers: {
        toggleQueue(state) {
            state.isOpen = !state.isOpen;
        },
        addSongToQueue(state, action) {
            addIfMissing(state, action.payload);
        },
        clearQueue(state) {
            state.queue = [];
        },
        removeFromQueue(state, action) {
            state.queue = state.queue.filter((song) => song.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        // Every song that gets loaded into the player also joins the queue.
        builder.addCase(fetchSong.fulfilled, (state, action) => {
            const { title, artists, thumbnail } = action.payload;
            addIfMissing(state, { id: action.meta.arg, title, artists, thumbnail });
        });
    },
});

export const { toggleQueue, addSongToQueue, clearQueue, removeFromQueue } = queueSlice.actions;

export default queueSlice.reducer;
