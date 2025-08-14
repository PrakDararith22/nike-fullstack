import { body } from "express-validator";

const nameRegex = /^[A-Za-z0-9]+$/i;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const registerValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .matches(nameRegex)
    .withMessage("Invalid Username"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Email must be at least 8 characters")
    .bail()
    .matches(emailRegex)
    .withMessage("Invalid Email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password too short"),
];

export default registerValidation;
