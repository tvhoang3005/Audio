import { createSlice } from '@reduxjs/toolkit';

const closedDropDown = { where: '', activeId: '', show: false };

const initialState = {
    // Only one song's "more" menu is open at a time, identified by list + song id.
    dropDown: closedDropDown,
    // The song whose thumbnail shows the "now playing" animation.
    lazyloadImage: { where: '', activeId: '' },
    isModalOpen: false,
};

const withWhereAndId = (where, id) => ({ payload: { where, id } });

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleDropDown: {
            reducer(state, action) {
                const { where, id } = action.payload;
                const { dropDown } = state;
                const isSameOpen =
                    dropDown.show && dropDown.where === where && dropDown.activeId === id;

                state.dropDown = isSameOpen ? closedDropDown : { where, activeId: id, show: true };
            },
            prepare: withWhereAndId,
        },
        playLazyloadEffect: {
            reducer(state, action) {
                state.lazyloadImage = { where: action.payload.where, activeId: action.payload.id };
            },
            prepare: withWhereAndId,
        },
        pauseLazyloadEffect(state) {
            state.lazyloadImage = { where: '', activeId: '' };
        },
        toggleModal(state) {
            state.isModalOpen = !state.isModalOpen;
        },
    },
});

export const { toggleDropDown, playLazyloadEffect, pauseLazyloadEffect, toggleModal } =
    uiSlice.actions;

export default uiSlice.reducer;
