// Final path fix for GitHub Actions
const { validateEmail } = require('./auth'); 

describe('Email Validation Suite', () => {
    test('should return true for a valid email', () => {
        expect(validateEmail('test@example.com')).toBe(true);
    });

    test('should return false for an invalid email', () => {
        expect(validateEmail('invalid-email')).toBe(false);
    });
});