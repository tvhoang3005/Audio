const USER_KEY = 'user';

export const loadUser = () => {
    try {
        const serialized = localStorage.getItem(USER_KEY);
        return serialized ? JSON.parse(serialized) : null;
    } catch {
        return null;
    }
};

export const saveUser = (user) => {
    try {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {
        // Storage can be unavailable (private mode, quota); the session still works in memory.
    }
};

export const clearUser = () => {
    try {
        localStorage.removeItem(USER_KEY);
    } catch {
        // See saveUser.
    }
};
