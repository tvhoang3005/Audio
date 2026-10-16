export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3004';

/** Resolves a file from `public/` against the app's base URL. */
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
