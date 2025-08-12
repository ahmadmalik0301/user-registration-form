import userSchema from "../../Validations/userSchema.js";
import prisma from "../../DB/DB.js";
export default async (req, res, next) => {
    try {
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const userId = Number(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const newEmail = value.email.trim().toLowerCase();
        const emailTaken = await prisma.user.findFirst({
            where: {
                email: newEmail,
                NOT: { id: userId },
            },
        });
        if (emailTaken)
            return res
                .status(409)
                .json({ message: "Another user with this email already exists" });
        const { first_name, last_name, age, phone_number, email, country, address, } = value;
        const updatedUser = await prisma.user.update({
            where: { id: userId },
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
            .status(200)
            .json({ message: "User updated successfully", user: updatedUser });
    }
    catch (err) {
        next(err);
    }
};
