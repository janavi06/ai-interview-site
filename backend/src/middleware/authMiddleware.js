import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    try {
        let token;

        const authHeader = req.headers.authorization;

        if ( 
            authHeader && authHeader.startsWith(
                "Bearer"
            )
        ) {
            token = authHeader.split(
                " "
            )[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized",
            });
        }

        // verify token 
        const decoded = jwt.verify(
            token, process.env.JWT_SECRET
        );

        // get user
        req.user = await User.findById(
            decoded.id
        );

        next();
    }catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token invalid",
        });

    }
};

export default protect;
