import prisma from "../../DB/DB.js";
export default async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: [{ id: "asc" }],
        });
        if (users.length === 0) {
            return res.status(200).json({ message: "No user to display" });
        }
        res.status(200).json({
            message: "All users in ascending order",
            users,
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        next(error);
    }
};
