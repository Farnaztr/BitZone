<<<<<<< HEAD:bit-zone/auth.test.js
const { validateEmail } = require('./auth.js');
describe('Email Validation Suite', () => {
    test('should return true for a valid email', () => {
        expect(validateEmail("developer@bitzone.com")).toBe(true);
    });

    test('should return false for an invalid email', () => {
        expect(validateEmail("invalid-email")).toBe(false);
    });
=======
test('Initial test to check Jest', () => {
    expect(1 + 1).toBe(2);
>>>>>>> 36f601b6171326e5dd8dc424961eec5f3f42e6fa:auth.test.js
});