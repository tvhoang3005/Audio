import { describe, expect, it } from 'vitest';
import { setupStore } from '.';
import { DEMO_ACCOUNT, logIn, logOut } from './authSlice';
import { addSongToQueue, clearQueue, removeFromQueue } from './queueSlice';
import { fetchSong } from './songSlice';
import { toggleDropDown } from './uiSlice';

const song = (id) => ({ id, title: `Song ${id}`, artists: ['Artist'], thumbnail: '' });

describe('queue', () => {
    it('ignores duplicate songs', () => {
        const store = setupStore();
        store.dispatch(addSongToQueue(song('a')));
        store.dispatch(addSongToQueue(song('a')));
        store.dispatch(addSongToQueue(song('b')));

        expect(store.getState().queue.queue.map((s) => s.id)).toEqual(['a', 'b']);
    });

    it('removes a single song without touching the previous state', () => {
        const store = setupStore();
        store.dispatch(addSongToQueue(song('a')));
        store.dispatch(addSongToQueue(song('b')));
        const before = store.getState().queue.queue;

        store.dispatch(removeFromQueue('a'));

        expect(store.getState().queue.queue.map((s) => s.id)).toEqual(['b']);
        expect(before).toHaveLength(2);
    });

    it('clears all songs', () => {
        const store = setupStore();
        store.dispatch(addSongToQueue(song('a')));
        store.dispatch(clearQueue());

        expect(store.getState().queue.queue).toEqual([]);
    });

    it('adds a fetched song to the queue and starts playing it', () => {
        const store = setupStore();
        const data = { ...song('ignored'), source: 'song.mp3' };
        store.dispatch(fetchSong.fulfilled(data, 'request-id', 'a'));

        expect(store.getState().song).toMatchObject({ data, isPlaying: true, isFetching: false });
        expect(store.getState().queue.queue).toEqual([
            { id: 'a', title: data.title, artists: data.artists, thumbnail: data.thumbnail },
        ]);
    });
});

describe('ui dropdown', () => {
    it('toggles the same dropdown closed and switches between dropdowns', () => {
        const store = setupStore();
        const dropDown = () => store.getState().ui.dropDown;

        store.dispatch(toggleDropDown('chart', '1'));
        expect(dropDown()).toEqual({ where: 'chart', activeId: '1', show: true });

        store.dispatch(toggleDropDown('track', '1'));
        expect(dropDown()).toEqual({ where: 'track', activeId: '1', show: true });

        store.dispatch(toggleDropDown('track', '1'));
        expect(dropDown().show).toBe(false);
    });
});

describe('auth', () => {
    it('rejects wrong credentials', async () => {
        const store = setupStore();
        await store.dispatch(logIn({ email: DEMO_ACCOUNT.email, password: 'wrong' }));

        expect(store.getState().auth).toMatchObject({
            isAuthenticated: false,
            isProcessing: false,
        });
    });

    it('persists the session without the password and clears it on logout', async () => {
        const store = setupStore();
        await store.dispatch(logIn(DEMO_ACCOUNT));

        expect(store.getState().auth.isAuthenticated).toBe(true);
        expect(JSON.parse(localStorage.getItem('user'))).toEqual({ email: DEMO_ACCOUNT.email });
        expect(setupStore().getState().auth.isAuthenticated).toBe(true);

        store.dispatch(logOut());

        expect(store.getState().auth.isAuthenticated).toBe(false);
        expect(localStorage.getItem('user')).toBeNull();
    });
});
