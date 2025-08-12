import findUser from "../../utils/findUser.js";
import userSchema from "../../Validations/userSchema.js";
import prisma from "../../DB/DB.js";
export default async (req, res, next) => {
    try {
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const user = await findUser(value.email);
        if (user)
            return res
                .status(409)
                .json({ message: "User with this email already exist" });
        const { first_name, last_name, age, phone_number, email, country, address, } = value;
        const newUser = await prisma.user.create({
            data: {
                first_name,
                last_name,
                age,
                phone_number,
                email,
                country,
                address,
            },
        });
        res
            .status(201)
            .json({ message: "User created successfully", user: newUser });
    }
    catch (err) {
        next(err);
    }
};
