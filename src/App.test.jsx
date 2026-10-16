import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';
import { DEMO_ACCOUNT } from './store/authSlice';
import { renderWithProviders } from './test/renderWithProviders';

describe('App', () => {
    it('renders the home page with tracks and the chart', () => {
        renderWithProviders(<App />);

        expect(screen.getByRole('heading', { name: 'Persie Hoang' })).toBeInTheDocument();
        expect(screen.getAllByText('Bánh Mì không').length).toBeGreaterThan(0);
        expect(screen.getByRole('button', { name: 'Top 10 Billboard' })).toHaveClass('active');
    });

    it('redirects anonymous users from a private route to the login page', () => {
        renderWithProviders(<App />, { route: '/mymusic' });

        expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    });

    it('logs in with the demo account and returns to the requested page', async () => {
        const user = userEvent.setup();
        renderWithProviders(<App />, { route: '/mymusic' });

        const form = within(screen.getByRole('heading', { name: 'Sign in' }).closest('form'));

        await user.type(form.getByPlaceholderText('Email...'), DEMO_ACCOUNT.email);
        await user.type(form.getByPlaceholderText('Password...'), DEMO_ACCOUNT.password);
        await user.click(form.getByRole('button', { name: 'Sign in' }));

        expect(await screen.findByText('Tạo playlist mới')).toBeInTheDocument();
        expect(screen.getByText(DEMO_ACCOUNT.email)).toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem('user'))).toEqual({ email: DEMO_ACCOUNT.email });
    });

    it('switches the active chart tab', async () => {
        const user = userEvent.setup();
        renderWithProviders(<App />);

        await user.click(screen.getByRole('button', { name: 'K-Pop Chart' }));

        expect(screen.getByRole('button', { name: 'K-Pop Chart' })).toHaveClass('active');
        expect(screen.getByRole('button', { name: 'Top 10 Billboard' })).not.toHaveClass('active');
    });

    it('opens and closes a song dropdown and adds the song to the queue', async () => {
        const user = userEvent.setup();
        const { store } = renderWithProviders(<App />);
        const [moreButton] = screen.getAllByRole('button', { name: 'More options' });

        await user.click(moreButton);
        expect(screen.getByText('Add to next up')).toBeInTheDocument();

        await user.click(moreButton);
        expect(screen.queryByText('Add to next up')).not.toBeInTheDocument();

        await user.click(moreButton);
        await user.click(screen.getByText('Add to next up'));
        expect(store.getState().queue.queue).toHaveLength(1);
        expect(screen.queryByText('Add to next up')).not.toBeInTheDocument();
    });

    it('opens the mobile menu from the burger button', async () => {
        const user = userEvent.setup();
        const { container } = renderWithProviders(<App />);

        await user.click(container.querySelector('.burger'));

        expect(container.querySelector('.nav-links')).toHaveClass('nav-fade');
        expect(container.querySelector('.burger')).toHaveClass('burger-toggle');
    });
});
