import Joi from "joi";
const loginScheme = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
});
export default loginScheme;
