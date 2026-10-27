import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },
        targetRole: {
            type: String,
            default: "",
        },
        skillLevel: {
            type: String,
            enum: [
                "Beginner",
                "Intermediate",
                "Advanced",
            ],
            default: "Beginner",
        },
    },
    {
        timestamps: true,
    }
);

//  FIXED: Hash password before saving (Pure async/await, no 'next')
userSchema.pre("save", async function () {
    // If the password field hasn't been changed, skip hashing
    if (!this.isModified("password")) {
        return; 
    }

    // Generate salt and hash the plaintext password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    // No next() invocation needed. Mongoose automatically finishes 
    // saving once this async function resolves.
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(
        enteredPassword,
        this.password
    );
};

const User = mongoose.model(
    "User",
    userSchema
);

export default User;