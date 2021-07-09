export default class Validate {
  constructor(parameters) {}

  static register = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    phone: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
    birthDate: {
      presence: false,
      type: "string",
    },
  });

  static login = (must = true) => ({
    phone: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });

  static forget = (must = true) => ({
    phone: {
      presence: must,
      type: "string",
    },
  });

  static verifyPassword = (must = true) => ({
    passwordOtp: {
      presence: must,
      type: "string",
    },
    newPassword: {
      presence: must,
      type: "string",
    },
  });
}
