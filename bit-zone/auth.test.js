const { validateEmail } = require('./auth.js');
describe('Email Validation Suite', () => {
    test('should return true for a valid email', () => {
        expect(validateEmail("developer@bitzone.com")).toBe(true);
    });

    test('should return false for an invalid email', () => {
        expect(validateEmail("invalid-email")).toBe(false);
    });
});