const Checkmate = require('../src/index.js');

describe('Checkmate Class - Integration Tests', () => {
  describe('validateObject() - Comprehensive Scenarios', () => {
    test('validateObject() - Valid Flat Object', () => {
      const data = {
        name: "John Doe",
        email: "john.doe@example.com",
        age: 30,
        isAdmin: true,
        password: "Password1!",
        url: "https://example.com",
        dateOfBirth: "1993-05-20",
      };

      const schema = {
        name: (v) => v.isString(),
        email: (v) => v.isEmail(),
        age: (v) => v.isNumber(),
        isAdmin: (v) => v.isBoolean(),
        password: (v) => v.isStrongPassword(),
        url: (v) => v.isUrl(),
        dateOfBirth: (v) => v.isDate(),
      };

      const errors = Checkmate.validateObject(data, schema);
      expect(errors).toBeNull();
    });

    test('validateObject() - Invalid Flat Object', () => {
      const data = {
        name: 12345, // Invalid: Not a string
        email: "invalid-email", // Invalid: Not a valid email
        age: "thirty", // Invalid: Not a number
        isAdmin: "true", // Invalid: Not a boolean
        password: "weak", // Invalid: Not a strong password
        url: "invalid-url", // Invalid: Not a valid URL
        dateOfBirth: "invalid-date", // Invalid: Not a valid date
      };

      const schema = {
        name: (v) => v.isString(),
        email: (v) => v.isEmail(),
        age: (v) => v.isNumber(),
        isAdmin: (v) => v.isBoolean(),
        password: (v) => v.isStrongPassword(),
        url: (v) => v.isUrl(),
        dateOfBirth: (v) => v.isDate(),
      };

      const errors = Checkmate.validateObject(data, schema);
      expect(errors).toEqual({
        name: ['Value must be a string.'],
        email: ['Value must be a valid email.'],
        age: ['Value must be a number.'],
        isAdmin: ['Value must be a boolean.'],
        password: [
          'Value must be a strong password (at least 8 characters, one uppercase, one number, and one special character).'
        ],
        url: ['Value must be a valid URL.'],
        dateOfBirth: ['Value must be a valid date.'],
      });
    });

    test('validateObject() - Partially Valid Flat Object', () => {
      const data = {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        age: "twenty-five", // Invalid: Not a number
        isAdmin: true,
      };

      const schema = {
        name: (v) => v.isString(),
        email: (v) => v.isEmail(),
        age: (v) => v.isNumber(),
        isAdmin: (v) => v.isBoolean(),
      };

      const errors = Checkmate.validateObject(data, schema);
      expect(errors).toEqual({
        age: ['Value must be a number.'],
      });
    });

    test('validateObject() - Empty Data Object', () => {
      const data = {};
      const schema = {
        name: (v) => v.isString(),
        email: (v) => v.isEmail(),
        age: (v) => v.isNumber(),
      };

      const errors = Checkmate.validateObject(data, schema);
      expect(errors).toEqual({
        name: ['Value must be a string.'],
        email: ['Value must be a valid email.'],
        age: ['Value must be a number.'],
      });
    });

    test('validateObject() - Valid Nested Object', () => {
      const data = {
        user: {
          name: "Alice",
          email: "alice@example.com",
          preferences: {
            theme: "dark",
            notifications: true,
          },
        },
      };

      const schema = {
        user: {
          name: (v) => v.isString(),
          email: (v) => v.isEmail(),
          preferences: {
            theme: (v) => v.isIn(["dark", "light"]),
            notifications: (v) => v.isBoolean(),
          },
        },
      };

      const errors = Checkmate.validateObject(data, schema);
      expect(errors).toBeNull();
    });

    test('validateObject() - Invalid Nested Object', () => {
      const data = {
        user: {
          name: 123, // Invalid: Not a string
          email: "invalid-email", // Invalid: Not a valid email
          preferences: {
            theme: "blue", // Invalid: Not in ["dark", "light"]
            notifications: "true", // Invalid: Not a boolean
          },
        },
      };

      const schema = {
        user: {
          name: (v) => v.isString(),
          email: (v) => v.isEmail(),
          preferences: {
            theme: (v) => v.isIn(["dark", "light"]),
            notifications: (v) => v.isBoolean(),
          },
        },
      };

      const errors = Checkmate.validateObject(data, schema);
      expect(errors).toEqual({
        user: {
          name: ['Value must be a string.'],
          email: ['Value must be a valid email.'],
          preferences: {
            theme: ['Value must be one of: dark, light'],
            notifications: ['Value must be a boolean.'],
          },
        },
      });
    });

    test('validateObject() - Missing Fields in Schema', () => {
      const data = {
        name: "Bob",
        email: "bob@example.com",
      };

      const schema = {
        name: (v) => v.isString(),
        email: (v) => v.isEmail(),
        age: (v) => v.isNumber(), // Missing field in data
      };

      const errors = Checkmate.validateObject(data, schema);
      expect(errors).toEqual({
        age: ['Value must be a number.'],
      });
    });

    test('validateObject() - Extra Fields in Data', () => {
      const data = {
        name: "Charlie",
        email: "charlie@example.com",
        extraField: "This should be ignored",
      };

      const schema = {
        name: (v) => v.isString(),
        email: (v) => v.isEmail(),
      };

      const errors = Checkmate.validateObject(data, schema);
      expect(errors).toBeNull(); // Extra fields are ignored
    });

    test('validateObject() - Deeply Nested Object', () => {
      const data = {
        user: {
          profile: {
            name: "Deepak",
            contact: {
              email: "deepak@example.com",
              phone: "+1234567890",
            },
          },
        },
      };

      const schema = {
        user: {
          profile: {
            name: (v) => v.isString(),
            contact: {
              email: (v) => v.isEmail(),
              phone: (v) => v.isPhoneNumber(),
            },
          },
        },
      };

      const errors = Checkmate.validateObject(data, schema);
      expect(errors).toBeNull();
    });

    test('validateObject() - Invalid Deeply Nested Object', () => {
      const data = {
        user: {
          profile: {
            name: 12345, // Invalid: Not a string
            contact: {
              email: "invalid-email", // Invalid: Not a valid email
              phone: "invalid-phone", // Invalid: Not a valid phone number
            },
          },
        },
      };

      const schema = {
        user: {
          profile: {
            name: (v) => v.isString(),
            contact: {
              email: (v) => v.isEmail(),
              phone: (v) => v.isPhoneNumber(),
            },
          },
        },
      };

      const errors = Checkmate.validateObject(data, schema);
      expect(errors).toEqual({
        user: {
          profile: {
            name: ['Value must be a string.'],
            contact: {
              email: ['Value must be a valid email.'],
              phone: ['Value must be a valid phone number.'],
            },
          },
        },
      });
    });
  });
});