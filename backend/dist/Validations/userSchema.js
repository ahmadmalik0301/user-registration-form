import Joi from "joi";
const userSchema = Joi.object({
    first_name: Joi.string().trim().min(2).max(50).optional(),
    last_name: Joi.string().trim().min(2).max(50).optional(),
    age: Joi.number().integer().min(1).max(120).optional().allow(null, ""),
    phone_number: Joi.string()
        .pattern(/^[0-9+\-\s()]{7,20}$/)
        .optional()
        .allow("", null)
        .messages({
        "string.pattern.base": "Phone number must be valid and between 7-20 characters.",
    }),
    email: Joi.string().email().optional(),
    country: Joi.string().trim().min(2).max(50).optional().allow("", null),
    address: Joi.string().trim().min(5).max(255).optional().allow("", null),
});
export default userSchema;
