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

  static addCategory = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    nameAr: {
      presence: must,
      type: "string",
    },
    image: {
      presence: must,
      type: "string",
    },
  });

  static addSubCategory = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    nameAr: {
      presence: must,
      type: "string",
    },
    image: {
      presence: must,
      type: "string",
    },
    category: {
      presence: must,
      type: "number",
    },
  });

  static addProduct = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    nameAr: {
      presence: must,
      type: "string",
    },
    description: {
      presence: must,
      type: "string",
    },
    descriptionAr: {
      presence: must,
      type: "string",
    },
    size: {
      presence: must,
      type: "string",
    },
    price: {
      presence: must,
      type: "number",
    },
    cost: {
      presence: must,
      type: "number",
    },
    quantity: {
      presence: must,
      type: "number",
    },
    warranty: {
      presence: must,
      type: "number",
    },
    image: {
      presence: must,
      type: "string",
    },
    subcategory: {
      presence: must,
      type: "number",
    },
  });
}
