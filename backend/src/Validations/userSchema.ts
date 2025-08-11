import Joi from "joi";

const userSchema = Joi.object({
  first_name: Joi.string().trim().min(2).max(50).required(),
  last_name: Joi.string().trim().min(2).max(50).required(),
  age: Joi.number().integer().min(1).max(120).empty("").optional(),
  phone_number: Joi.string()
    .pattern(/^[0-9+\-\s()]{7,20}$/)
    .optional()
    .empty("")
    .messages({
      "string.pattern.base":
        "Phone number must be valid and between 7-20 characters.",
    }),
  email: Joi.string().email().required(),
  country: Joi.string().trim().min(2).max(50).optional().empty(""),
  address: Joi.string().trim().min(5).max(255).optional().empty(""),
});

export default userSchema;
