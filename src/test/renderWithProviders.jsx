import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { setupStore } from '../store';

export const renderWithProviders = (ui, { route = '/', preloadedState, store } = {}) => {
    const appStore = store ?? setupStore(preloadedState);
    return {
        store: appStore,
        ...render(
            <Provider store={appStore}>
                <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
            </Provider>,
        ),
    };
};
