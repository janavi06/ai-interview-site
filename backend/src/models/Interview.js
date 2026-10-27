import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    questionId: {
        type: Number,
        required: true,
    },

    userAnswer: {
        type: String,
        default: "",
    },


    score: {
        type: Number,
        default: 0,
    },

    feedback: {
        strengths: [String],
        weaknesses: [String],
        missingConcepts: [String],

        idealAnswer: {
            type: String,
            default: "",
        },
    },
});

const questionSchema = new mongoose.Schema({

    questionId: Number,
    question: String,
    type: String,
    topic: String,
    difficulty: String,
});

const interviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,

            ref: "User",
            required: true,
        },

        role: {
            type: String,
            required: true,
        },

        experienceLevel: {
            type: String,
            required: true
        },

        difficulty: {
            type: String,
            required: true,
        },

        mode: {
            type: String,
            enum: [
                "practice",
                "interview",
            ],
            required: true,
            default: "practice",
        },

        feedbackMode: {
            type: String,
            enum: [
                "instant",
                "end"
            ],
            required: true,
        },

        totalQuestions: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "in-progress",
                "completed",
            ],

            default: "in-progress",
        },

        durationInSeconds: {
            type: Number,
            default: 0,
        },

        startedAt: {
            type: Date,
            default: Date.now,
        },

        completedAt: {
            type: Date,
        },

        questions: [questionSchema],
        answers: [answerSchema],
        averageScore: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Interview = mongoose.model(
    "Interview",
    interviewSchema
);

export default Interview;