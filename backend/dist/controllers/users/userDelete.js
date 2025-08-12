import prisma from "../../DB/DB.js";
export default async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });
        return res.json({
            message: "User deleted successfully",
            user: deletedUser,
        });
    }
    catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "No user with this ID exists" });
        }
        next(error);
    }
};
