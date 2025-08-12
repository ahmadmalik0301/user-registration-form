import loginScheme from "../../Validations/loginSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
async function loginPost(req, res, next) {
    try {
        const { error, value } = loginScheme.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.message });
        const { email, password } = value;
        console.log(process.env.ADMIN_EMAIL);
        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ message: "Wrong Credidential" });
        }
        const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASS);
        if (!isMatch) {
            return res.status(401).json({ message: "Wrong Credidential" });
        }
        const token = jwt.sign({ email, role: "Admin" }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({ message: "Login Successful", token });
    }
    catch (err) {
        console.error("Login error:", err);
        next(err);
    }
}
export default loginPost;
