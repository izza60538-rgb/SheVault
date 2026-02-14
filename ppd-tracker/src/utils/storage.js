const STORAGE_PREFIX = 'shevault_entries_';

export const saveEntry = (username, entry) => {
    if (!username) return;
    const entries = getEntries(username);
    const newEntry = {
        id: Date.now(),
        date: new Date().toISOString(),
        ...entry
    };
    const updatedEntries = [...entries, newEntry];
    localStorage.setItem(STORAGE_PREFIX + username, JSON.stringify(updatedEntries));
    return newEntry;
};

export const getEntries = (username) => {
    if (!username) return [];
    const stored = localStorage.getItem(STORAGE_PREFIX + username);
    return stored ? JSON.parse(stored) : [];
};

export const clearEntries = (username) => {
    if (!username) return;
    localStorage.removeItem(STORAGE_PREFIX + username);
};

// User Management
const USERS_KEY = 'shevault_users';

export const getUserProfile = (username) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    return users[username] || {};
};

export const updateUserProfile = (username, data) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    if (users[username]) {
        users[username] = { ...users[username], ...data };
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
};

export const deleteUserAccount = (username) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    delete users[username];
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Clear data
    clearEntries(username);
};
