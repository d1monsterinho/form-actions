import {isEmail, isEqualToOtherValue, isNotEmpty, isPasswordValid} from "./validation.js";

export default function handleSingupAction(prevFormState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    const firstName = formData.get('first-name');
    const lastName = formData.get('last-name');
    const role = formData.get('role');
    const acquisitionChannels = formData.getAll('acquisition');
    const terms = formData.get('terms');

    const errors = [];

    if (!isEmail(email)) errors.push('Please, enter valid email');
    if (!isPasswordValid(password)) errors.push('Password must have at least 6 characters');
    if (!isEqualToOtherValue(password, confirmPassword)) errors.push('Passwords must be equal');
    if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) errors.push('Both first and last names must not be empty');
    if (!isNotEmpty(role)) errors.push('Please, choose your role');
    if (acquisitionChannels.length === 0) errors.push('Please, choose at least one channel');
    if (!terms) errors.push('Terms must be agreed to continue');

    return {
        enteredValues: {
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            role,
            acquisitionChannels,
            terms,
        },
        errors,
    };
}