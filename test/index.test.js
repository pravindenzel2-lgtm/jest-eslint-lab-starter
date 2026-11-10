const {
    capitalizeWords,
    filterActiveUsers,
    logAction
} = require('../index');

describe('capitalizeWords', () => {
    test('capitalizes the first letter of each word', () => {
        expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    test('handles an empty string', () => {
        expect(capitalizeWords('')).toBe('');
    });

    test('handles a single word', () => {
        expect(capitalizeWords('javascript')).toBe('Javascript');
    });

    test('handles already capitalized words', () => {
        expect(capitalizeWords('Hello World')).toBe('Hello World');
    });

    test('handles numbers in a string', () => {
        expect(capitalizeWords('hello 123 world')).toBe('Hello 123 World');
    });
});

describe('filterActiveUsers', () => {
    const users = [
        { name: 'Alice', isActive: true },
        { name: 'Bob', isActive: false },
        { name: 'Charlie', isActive: true }
    ];

    test('returns only active users', () => {
        expect(filterActiveUsers(users)).toEqual([
            { name: 'Alice', isActive: true },
            { name: 'Charlie', isActive: true }
        ]);
    });

    test('returns an empty array when no users are active', () => {
        expect(filterActiveUsers([
            { name: 'Bob', isActive: false }
        ])).toEqual([]);
    });

    test('returns an empty array when given an empty array', () => {
        expect(filterActiveUsers([])).toEqual([]);
    });

    test('does not modify the original array', () => {
        const original = [...users];

        filterActiveUsers(users);

        expect(users).toEqual(original);
    });
});

describe('logAction', () => {
    test('returns a log message containing the username and action', () => {
        const result = logAction('login', 'Alice');

        expect(result).toContain('User Alice performed login at ');
    });

    test('includes a valid ISO timestamp', () => {
        const result = logAction('logout', 'Bob');
        const timestamp = result.split(' at ')[1];

        expect(new Date(timestamp).toISOString()).toBe(timestamp);
    });

    test('handles empty action and username', () => {
        expect(logAction('', '')).toContain('User  performed  at ');
    });
});