const { z } = require("zod");
const zObjectId = require("../validators/zObjectId");

// @desc id user zod schema validator
const idUserSchema = z.strictObject({
    id: zObjectId
});

// @desc User zod schema validator
const zCreateUserSchema = z.strictObject({
    userName: z.string("Username is required").trim().min(3, "At least 3 characters").max(90, "At most 90 characters"),
    email: z.string("Email is required").trim().toLowerCase().min(6, "At least 6 characters").max(90, "At most 90 characters").pipe(z.email("Email must have a format of -name@email.com-")),
    password: z.string("Password is required").min(8, "At least 8 characters").max(45, "At most 45 characters"),
    fullName: z.string().trim().min(3, "At least 3 characters").max(90, "At most 90 characters").optional(),
    role: z.enum(["user", "admin"]).optional(),
});

// @desc User zod update schema validator
const zUpdateUserSchema = z.strictObject({
    userName: z.string().trim().min(3, "At least 3 characters").max(90, "At most 90 characters").optional(),
    email: z.string().trim().toLowerCase().min(6, "At least 6 characters").max(90, "At most 90 characters").pipe(z.email("Email must have a format of -name@email.com-")).optional(),
    fullName: z.string().trim().min(3, "At least 3 characters").max(90, "At most 90 characters").optional(),
    role: z.enum(["user", "admin"]).optional(),
    isActive: z.boolean().optional(),
    loginCount: z.number().int("Must be an integer").min(0, "Cannot be negative").optional(),
    lastLogin: z.coerce.date().optional(),
    suspiciousActivity: z.boolean().optional(),
    fraudScore: z.coerce.number("Must be a number").min(0, "fraudScore must be >= 0").max(1, "fraudScore must be <= 1").optional(),
    lastIp: z.string().max(45, "At most 45 characters").optional(),
    userAgent: z.string().nullable().optional()
}).refine((data) => Object.keys(data).length >= 2, {
    message: "At least 2 fields must be provided for update!",
    path: ["user"]
});


// @desc User zod changePassword schema validator
const zChangePasswordSchema = z.strictObject({
    password: z.string("Password is required").min(8, "Password must be at least 8 characters"),
    newPassword: z.string("newPassword is required").min(8, "newPassword must at be least 8 characters"),
    confirmNewPassword: z.string("confirmNewPassword is required").min(8, "confirmNewPassword must be at least 8 characters"),
}).refine(
    (data) => data.newPassword === data.confirmNewPassword,
    {
        message: "newPassword and confirmNewPassword do not match!",
        path: ["confirmNewPassword"]
    }
);

// @desc User zod updateLoggedUser schema validator
const zUpdateLoggedUserSchema = z.strictObject({
    userName: z.string().trim().min(3, "At least 3 characters").max(90, "At most 90 characters").optional(),
    email: z.string().trim().toLowerCase().min(6, "At least 6 characters").max(90, "At most 90 characters").pipe(z.email("Email must have a format of -name@email.com-")).optional(),
    fullName: z.string().trim().min(3, "At least 3 characters").max(90, "At most 90 characters").optional(),
    role: z.enum(["user", "admin"]).optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update!",
    path: ["user logged"]
});

module.exports = {
    idUserSchema,
    zCreateUserSchema,
    zUpdateUserSchema,
    zChangePasswordSchema,
    zUpdateLoggedUserSchema
};