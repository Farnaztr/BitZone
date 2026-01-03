function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

if (typeof module !== 'undefined') {
    module.exports = { validateEmail };
}