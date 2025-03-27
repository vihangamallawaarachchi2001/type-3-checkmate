const Checkmate = require('../src/index.js');

describe('Checkmate Class - Unit Tests', () => {
  // Basic Validation Methods
  describe('Basic Validations', () => {
    test('isString() - Valid String', () => {
      const validator = new Checkmate("Hello");
      expect(validator.isString().isValid()).toBe(true);
    });

    test('isString() - Invalid String', () => {
      const validator = new Checkmate(123);
      expect(validator.isString().isValid()).toBe(false);
      expect(validator.getErrors()).toEqual(['Value must be a string.']);
    });

    test('isNumber() - Valid Number', () => {
      const validator = new Checkmate(42);
      expect(validator.isNumber().isValid()).toBe(true);
    });

    test('isNumber() - Invalid Number', () => {
      const validator = new Checkmate("42");
      expect(validator.isNumber().isValid()).toBe(false);
      expect(validator.getErrors()).toEqual(['Value must be a number.']);
    });

    test('isBoolean() - Valid Boolean', () => {
      const validator = new Checkmate(true);
      expect(validator.isBoolean().isValid()).toBe(true);
    });

    test('isBoolean() - Invalid Boolean', () => {
      const validator = new Checkmate("true");
      expect(validator.isBoolean().isValid()).toBe(false);
      expect(validator.getErrors()).toEqual(['Value must be a boolean.']);
    });
  });

  // Length-Based Validations
  describe('Length-Based Validations', () => {
    test('minLength() - Valid Min Length', () => {
      const validator = new Checkmate("Hello");
      expect(validator.minLength(3).isValid()).toBe(true);
    });

    test('minLength() - Invalid Min Length', () => {
      const validator = new Checkmate("Hi");
      expect(validator.minLength(3).isValid()).toBe(false);
      expect(validator.getErrors()).toEqual(['Value must have at least 3 characters.']);
    });

    test('maxLength() - Valid Max Length', () => {
      const validator = new Checkmate("Hello");
      expect(validator.maxLength(5).isValid()).toBe(true);
    });

    test('maxLength() - Invalid Max Length', () => {
      const validator = new Checkmate("HelloWorld");
      expect(validator.maxLength(5).isValid()).toBe(false);
      expect(validator.getErrors()).toEqual(['Value must have at most 5 characters.']);
    });
  });

  // Pattern-Based Validations
  describe('Pattern-Based Validations', () => {
    test('isEmail() - Valid Email', () => {
      const validator = new Checkmate("test@example.com");
      expect(validator.isEmail().isValid()).toBe(true);
    });

    test('isEmail() - Invalid Email', () => {
      const validator = new Checkmate("invalid-email");
      expect(validator.isEmail().isValid()).toBe(false);
      expect(validator.getErrors()).toEqual(['Value must be a valid email.']);
    });

    test('isUrl() - Valid URL', () => {
      const validator = new Checkmate("https://example.com");
      expect(validator.isUrl().isValid()).toBe(true);
    });

    test('isUrl() - Invalid URL', () => {
      const validator = new Checkmate("invalid-url");
      expect(validator.isUrl().isValid()).toBe(false);
      expect(validator.getErrors()).toEqual(['Value must be a valid URL.']);
    });

    test('isStrongPassword() - Valid Password', () => {
      const validator = new Checkmate("Password1!");
      expect(validator.isStrongPassword().isValid()).toBe(true);
    });

    test('isStrongPassword() - Invalid Password', () => {
      const validator = new Checkmate("weak");
      expect(validator.isStrongPassword().isValid()).toBe(false);
      expect(validator.getErrors()).toEqual([
        'Value must be a strong password (at least 8 characters, one uppercase, one number, and one special character).'
      ]);
    });
  });

  // Specialized Validations
  describe('Specialized Validations', () => {
    test('isIn() - Valid Array Inclusion', () => {
      const validator = new Checkmate("apple");
      expect(validator.isIn(["apple", "banana"]).isValid()).toBe(true);
    });

    test('isIn() - Invalid Array Inclusion', () => {
      const validator = new Checkmate("cherry");
      expect(validator.isIn(["apple", "banana"]).isValid()).toBe(false);
      expect(validator.getErrors()).toEqual(['Value must be one of: apple, banana']);
    });

    test('isEmpty() - Valid Empty Check', () => {
      const validator = new Checkmate("");
      expect(validator.isEmpty().isValid()).toBe(false);
      expect(validator.getErrors()).toEqual(['Value must not be empty.']);
    });

    test('isDate() - Valid Date', () => {
      const validator = new Checkmate("2023-10-01");
      expect(validator.isDate().isValid()).toBe(true);
    });

    test('isDate() - Invalid Date', () => {
      const validator = new Checkmate("invalid-date");
      expect(validator.isDate().isValid()).toBe(false);
      expect(validator.getErrors()).toEqual(['Value must be a valid date.']);
    });
  });

  // Integration Testing
  describe('validateObject()', () => {
    test('validateObject() - Valid Object', () => {
      const data = { name: "John", age: 30 };
      const schema = {
        name: (v) => v.isString(),
        age: (v) => v.isNumber(),
      };
      const errors = Checkmate.validateObject(data, schema);
      expect(errors).toBeNull();
    });

    test('validateObject() - Invalid Object', () => {
      const data = { name: 123, age: "thirty" };
      const schema = {
        name: (v) => v.isString(),
        age: (v) => v.isNumber(),
      };
      const errors = Checkmate.validateObject(data, schema);
      expect(errors).toEqual({
        name: ['Value must be a string.'],
        age: ['Value must be a number.'],
      });
    });
  });
});