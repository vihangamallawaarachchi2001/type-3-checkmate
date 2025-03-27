class Checkmate {
    constructor(value) {
      this.value = value;
      this.errors = [];
    }
  
    isString() {
      if (typeof this.value !== 'string') {
        this.errors.push('Value must be a string.');
      }
      return this;
    }
  
    isNumber() {
      if (typeof this.value !== 'number' || isNaN(this.value)) {
        this.errors.push('Value must be a number.');
      }
      return this;
    }
  
    isBoolean() {
      if (typeof this.value !== 'boolean') {
        this.errors.push('Value must be a boolean.');
      }
      return this;
    }
  
    minLength(min) {
      if (typeof this.value !== 'string' || this.value.length < min) {
        this.errors.push(`Value must have at least ${min} characters.`);
      }
      return this;
    }
  
    maxLength(max) {
      if (typeof this.value !== 'string' || this.value.length > max) {
        this.errors.push(`Value must have at most ${max} characters.`);
      }
      return this;
    }
  
    isEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof this.value !== 'string' || !emailRegex.test(this.value)) {
        this.errors.push('Value must be a valid email.');
      }
      return this;
    }
  
    isIn(array) {
      if (!array.includes(this.value)) {
        this.errors.push(`Value must be one of: ${array.join(', ')}`);
      }
      return this;
    }
  
    isUrl() {
      try {
        new URL(this.value);
      } catch (_) {
        this.errors.push('Value must be a valid URL.');
      }
      return this;
    }
  
    isEmpty() {
      if (this.value === '' || this.value == null) {
        this.errors.push('Value must not be empty.');
      }
      return this;
    }
  
    isDate() {
      if (isNaN(Date.parse(this.value))) {
        this.errors.push('Value must be a valid date.');
      }
      return this;
    }
  
    isAlpha() {
      const alphaRegex = /^[A-Za-z]+$/;
      if (typeof this.value !== 'string' || !alphaRegex.test(this.value)) {
        this.errors.push('Value must contain only alphabetic characters.');
      }
      return this;
    }
  
    isAlphaNumeric() {
      const alphaNumRegex = /^[A-Za-z0-9]+$/;
      if (typeof this.value !== 'string' || !alphaNumRegex.test(this.value)) {
        this.errors.push('Value must contain only alphanumeric characters.');
      }
      return this;
    }
  
    isPhoneNumber() {
      const phoneRegex = /^[+]*[0-9]{1,4}[ -]?[0-9]{1,4}[ -]?[0-9]{1,4}[ -]?[0-9]{1,4}$/;
      if (typeof this.value !== 'string' || !phoneRegex.test(this.value)) {
        this.errors.push('Value must be a valid phone number.');
      }
      return this;
    }
  
    isCreditCard() {
      const creditCardRegex = /^(\d{4}[-\s]?){3}\d{4}$/;
      if (typeof this.value !== 'string' || !creditCardRegex.test(this.value)) {
        this.errors.push('Value must be a valid credit card number.');
      }
      return this;
    }
  
    isUUID() {
      const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
      if (typeof this.value !== 'string' || !uuidRegex.test(this.value)) {
        this.errors.push('Value must be a valid UUID.');
      }
      return this;
    }
  
    isLowercase() {
      if (typeof this.value !== 'string' || this.value !== this.value.toLowerCase()) {
        this.errors.push('Value must be in lowercase.');
      }
      return this;
    }
  
    isUppercase() {
      if (typeof this.value !== 'string' || this.value !== this.value.toUpperCase()) {
        this.errors.push('Value must be in uppercase.');
      }
      return this;
    }
  
    isPostalCode() {
      const postalCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/; // US Postal Code format
      if (typeof this.value !== 'string' || !postalCodeRegex.test(this.value)) {
        this.errors.push('Value must be a valid postal code.');
      }
      return this;
    }
  
    isName() {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (typeof this.value !== 'string' || !nameRegex.test(this.value)) {
        this.errors.push('Value must be a valid name (letters and spaces only).');
      }
      return this;
    }
  
    isAlphanumericSpace() {
      const alphaNumSpaceRegex = /^[A-Za-z0-9\s]+$/;
      if (typeof this.value !== 'string' || !alphaNumSpaceRegex.test(this.value)) {
        this.errors.push('Value must be alphanumeric and spaces only.');
      }
      return this;
    }
  
    isAlphaSpace() {
      const alphaSpaceRegex = /^[A-Za-z\s]+$/;
      if (typeof this.value !== 'string' || !alphaSpaceRegex.test(this.value)) {
        this.errors.push('Value must be alphabetic characters and spaces only.');
      }
      return this;
    }
  
    isHexColor() {
      const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;
      if (typeof this.value !== 'string' || !hexColorRegex.test(this.value)) {
        this.errors.push('Value must be a valid hexadecimal color code.');
      }
      return this;
    }
  
    isStrongPassword() {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (typeof this.value !== 'string' || !passwordRegex.test(this.value)) {
        this.errors.push(
          'Value must be a strong password (at least 8 characters, one uppercase, one number, and one special character).'
        );
      }
      return this;
    }
  
    isValid() {
      return this.errors.length === 0;
    }
  
    getErrors() {
      return this.errors;
    }
  
    static validateObject(data, schema) {
      let errors = {};
  
      for (const key in schema) {
        const validator = new Checkmate(data[key]);
  
        // Check if the schema[key] is a function or an object (nested schema)
        if (typeof schema[key] === 'function') {
          // Apply the validation function
          schema[key](validator);
  
          if (!validator.isValid()) {
            errors[key] = validator.getErrors();
          }
        } else if (typeof schema[key] === 'object' && schema[key] !== null) {
          // Recursively validate nested objects
          const nestedErrors = Checkmate.validateObject(data[key], schema[key]);
          if (nestedErrors) {
            errors[key] = nestedErrors;
          }
        }
      }
  
      return Object.keys(errors).length === 0 ? null : errors;
    }
  }
  
  module.exports = Checkmate;