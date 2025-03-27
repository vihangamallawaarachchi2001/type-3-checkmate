
# **type-3-checkmate - Node.js Input Validation Library**

Welcome to **type-3-checkmate**, a powerful, easy-to-use Node.js validation library for ensuring your inputs meet the criteria you specify. This library offers a comprehensive set of validation methods to check various data types and formats, from strings and numbers to emails, URLs, and more.

## **Table of Contents**
- [**type-3-checkmate - Node.js Input Validation Library**](#type-3-checkmate---nodejs-input-validation-library)
  - [**Table of Contents**](#table-of-contents)
  - [**Installation**](#installation)
  - [**Basic Usage**](#basic-usage)
  - [**Validation Methods**](#validation-methods)
  - [**Custom Error Messages**](#custom-error-messages)
  - [**Chaining Validations**](#chaining-validations)
  - [**Advanced Usage**](#advanced-usage)
  - [**Validation for Objects**](#validation-for-objects)
  - [**Error Handling**](#error-handling)
  - [**Example**](#example)
  - [**Testing**](#testing)
  - [**Contributing**](#contributing)
  - [**Future Plans**](#future-plans)
  - [**License**](#license)

## **Installation**

To get started, install `type-3-checkmate` via npm:

```bash
npm install type-3-checkmate
```

## **Basic Usage**

After installation, you can start using `type-3-checkmate` in your project like so:

```js
const Checkmate = require('type-3-checkmate');

// Create a new instance of Checkmate with a value
const validator = new Checkmate('test@example.com');

// Validate the value with different validation methods
validator.isEmail().isString();

// Check if validation passed
if (validator.isValid()) {
    console.log('Validation passed!');
} else {
    console.log('Validation failed:', validator.getErrors());
}
```

## **Validation Methods**

Here is a list of available validation methods you can use to validate different types of data:

1. **isString()**: Checks if the value is a string.
2. **isNumber()**: Checks if the value is a number.
3. **isBoolean()**: Checks if the value is a boolean.
4. **minLength(min)**: Ensures the string is at least `min` characters long.
5. **maxLength(max)**: Ensures the string is no more than `max` characters long.
6. **isEmail()**: Checks if the value is a valid email.
7. **isIn(array)**: Checks if the value is in the specified array.
8. **isUrl()**: Checks if the value is a valid URL.
9. **isEmpty()**: Checks if the value is empty or null.
10. **isDate()**: Checks if the value is a valid date.
11. **isAlpha()**: Checks if the string contains only alphabetic characters.
12. **isAlphaNumeric()**: Checks if the string contains only alphanumeric characters.
13. **isPhoneNumber()**: Checks if the value is a valid phone number.
14. **isCreditCard()**: Checks if the value is a valid credit card number.
15. **isUUID()**: Checks if the value is a valid UUID.
16. **isLowercase()**: Checks if the value is all lowercase.
17. **isUppercase()**: Checks if the value is all uppercase.
18. **isPostalCode()**: Checks if the value is a valid postal code.
19. **isName()**: Checks if the value is a valid name.
20. **isAlphanumericSpace()**: Checks if the value contains alphanumeric characters and spaces only.
21. **isAlphaSpace()**: Checks if the value contains alphabetic characters and spaces only.
22. **isHexColor()**: Checks if the value is a valid hexadecimal color code.
23. **isStrongPassword()**: Checks if the value meets the criteria for a strong password.

## **Custom Error Messages**

You can provide custom error messages for each validation method. Here’s how:

```js
const validator = new Checkmate('12345');
validator.isNumber().minLength(10, 'Your number must have at least 10 digits.');
```

## **Chaining Validations**

The library allows you to chain multiple validation methods together for cleaner code:

```js
const validator = new Checkmate('john.doe@example.com')
    .isEmail()
    .isString()
    .isLowercase();

if (validator.isValid()) {
    console.log('Valid input!');
} else {
    console.log('Errors:', validator.getErrors());
}
```

## **Advanced Usage**

You can validate objects with nested fields using the `validateObject` method:

```js
const user = {
    email: 'test@example.com',
    password: 'StrongPass123!',
    phoneNumber: '123-456-7890'
};

const schema = {
    email: (validator) => validator.isEmail(),
    password: (validator) => validator.isStrongPassword(),
    phoneNumber: (validator) => validator.isPhoneNumber()
};

const result = Checkmate.validateObject(user, schema);
console.log(result);
```

## **Validation for Objects**

In addition to validating individual values, `type-3-checkmate` supports validating objects using a schema. This allows for more complex validation scenarios where you define custom validation rules for each field.

```js
const schema = {
    name: (validator) => validator.isAlpha().minLength(3),
    age: (validator) => validator.isNumber().min(18),
    email: (validator) => validator.isEmail(),
};

const userData = {
    name: 'John',
    age: 25,
    email: 'john@example.com'
};

const errors = Checkmate.validateObject(userData, schema);
console.log(errors);
```

## **Error Handling**

When a validation fails, you can retrieve the error messages using the `getErrors()` method:

```js
const validator = new Checkmate('invalid-email');
validator.isEmail();

if (!validator.isValid()) {
    console.log(validator.getErrors());  // Prints validation errors
}
```

## **Example**

Here's a full example showcasing how to use the library:

```js
const Checkmate = require('type-3-checkmate');

const formData = {
    email: 'user@domain.com',
    password: 'password123!',
    age: 25
};

const schema = {
    email: (validator) => validator.isEmail(),
    password: (validator) => validator.isStrongPassword(),
    age: (validator) => validator.isNumber().min(18)
};

const errors = Checkmate.validateObject(formData, schema);

if (errors) {
    console.log('Validation failed:', errors);
} else {
    console.log('Form is valid!');
}
```

## **Testing**

We recommend writing unit tests for any custom validations you create. You can use a testing framework like **Jest** to test your validation logic.

```bash
npm install jest
```

Create a test file and add your test cases:

```js
const Checkmate = require('type-3-checkmate');

test('should validate a valid email', () => {
    const validator = new Checkmate('valid@example.com');
    expect(validator.isEmail().isValid()).toBe(true);
});

test('should fail invalid email', () => {
    const validator = new Checkmate('invalid-email');
    expect(validator.isEmail().isValid()).toBe(false);
});
```

## **Contributing**

We welcome contributions to **type-3-checkmate**! If you want to report a bug or add a new feature, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or fix
3. Write tests for your changes
4. Submit a pull request with a clear description of your changes

## **Future Plans**

Here are some features we're planning to add in the future:

- **Async Validation**: Support for async validation methods (e.g., checking if an email already exists in a database).
- **Localization**: Support for multiple languages for error messages to make the library more globally accessible.
- **More Validation Rules**: Additional validations like IP addresses, SSNs, etc.
- **Custom Validation Functions**: Allow users to create custom validators easily.
- **Integration with Front-End Frameworks**: Easy integration with popular front-end frameworks like React and Angular.
- **Performance Enhancements**: Further optimize regex checks and improve overall performance for large datasets.

## **License**

`type-3-checkmate` is licensed under the [MIT License](LICENSE).

