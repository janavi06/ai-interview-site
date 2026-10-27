import {body} from "express-validator";

export const registerValidation = [
    body("fullName")
    .trim()
    .notEmpty()
    .withMessage(
        "Full name is required"
    ),

    body("email")
    .isEmail()
    .withMessage(
        "Valid Email Required"
    ),

    body("password")
    .isLength({min: 6})
    .withMessage(
        "Password must be atleast 6 caracters"
    ),
];

export const loginValidation = [
    body("email")
    .isEmail()
    .withMessage(
        "Valid Email Required"
    ),
    body("password")
    .notEmpty()
    .withMessage(
        "Password is required"
    )
]