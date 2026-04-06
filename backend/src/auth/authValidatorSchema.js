const { z } = require("zod");

// @desc Register zod schema validator
const zAuthRegisterSchema = z.strictObject({
    userName: z.string("userName is required").trim().min(3, "At least 3 characters").max(60, "At most 60 characters"),
    email: z.string("Email is required").trim().toLowerCase().min(6, "At least 6 characters").max(60, "At most 60 characters").pipe(z.email("Email must have a format of -name@email.com-")),
    password: z.string("Password is required").min(8, "At least 8 characters").max(45, "At most 45 characters"),
    confirmPassword: z.string("confirmPassword is required!"),
    fullName: z.string().trim().min(3).max(60).optional(),
}).refine((field) => field.password === field.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match!"
});

// @desc Login zod schema validator
const zAuthLoginSchema = z.strictObject({
    email: z.string("Email is required").trim().toLowerCase().min(6, "At least 6 characters").max(60, "At most 60 characters").pipe(z.email("Email must have a format of -name@email.com-")),
    password: z.string("Password is required").min(8, "At least 8 characters").max(45, "At most 45 characters"),
});

module.exports = { zAuthRegisterSchema, zAuthLoginSchema };
