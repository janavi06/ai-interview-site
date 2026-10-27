import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import Interview from "../models/Interview.js";
// register user
export const registerUser = async (req,res) => {
    try {
        const {
            fullName,
            email,
            password,
        } = req.body;

        // check exisiting user
        const existingUser = await User.findOne({
            email,
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists",
            });
        }

        // create user
        const user = await User.create({
            fullName,
            email,
            password,
        });

        // generate token
        const token = generateToken(
            user._id
        );
        return res.status(201).json({
            success: true,

            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
}

export const loginUser = async (req,res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // find user with password
        const user = await User.findOne({
            email,
        }).select("+password");

        // user not found
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // comapre password
        const isMatch = await user.comparePassword(
            password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        // Generate Token
        const token = generateToken(
            user._id
        );

        return res.json({
            success: true,
            token,

            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(
            req.user.id
        );

        return res.json({
            success: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// get profile stats
 
export const getProfile = async (req,res) => {
    try {
        const user = req.user;

        const interviews = await Interview.find({
            userId: user._id,
        });

        const totalInterviews = interviews.length;

        const averageScore = totalInterviews > 0
        ? (
            interviews.reduce(
                (
                    sum,
                    interview
                ) => 
                    sum + 
                    (
                        interview.averageScore || 0
                    ),
                     0
            )
            /
            totalInterviews
        ).toFixed(1) : 0;

        // most used mode

        const practiceCount = interviews.filter(
            (
                interview
            ) => 
                interview.mode === "practice"
        ).length;

        const interviewCount = interviews.filter(
            (
                interview
            ) => interview.mode === "interview"
        ).length;

        const preferredMode = practiceCount >=
        interviewCount 
        ? "Practice"
        : "Interview";

        return res.status(200).json({
            success: true,
            profile: {
                fullName: user.fullName,
                email: user.email,
                joinedAt: user.createdAt,
                totalInterviews,
                averageScore,
                preferredMode,
            },
        });

    } catch (error) {
            console.error(
                "PROFILE ERROR:"
            );

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        

    }
}
