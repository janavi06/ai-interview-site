import Interview from "../models/Interview.js";

import {generateInterviewQuestions} from "../services/geminiService.js";
import { evaluateAnswer } from "../services/evaluationService.js";
// start interview 
export const startInterview = async (req,res) => {
    try {
        const {
            role,
            experienceLevel,
            difficulty,
            numberOfQuestions,
            feedbackMode,
            mode,
        } = req.body;

        const questions = await generateInterviewQuestions({
            role,
            experienceLevel,
            difficulty,
            numberOfQuestions,
        });

        const interview = await Interview.create({
            userId: req.user._id,

            role,
            experienceLevel,
            difficulty,
            mode,
            feedbackMode,
            totalQuestions: numberOfQuestions,
            questions,
            status: "in-progress",
        });

        return res.status(201).json({
            success: true,
            interview,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const evaluateInteriewAnswer = async (req,res) => {
    try {
        const {interviewId, questionId, userAnswer,} = req.body;

        const interview = await Interview.findById(
            interviewId
        );

        if (
            !interview
        ) {
            return res.status(404).json({
                success: false,
                message: "Interview not found",
            });
        }

        // find question

        const question = interview.questions.find(
            (q) => q.questionId === questionId
        );

        if (
            !question
        ) {
            return res.status(404).json({
                success: false,
                message: "Question not found",
            });
        }

        // Evaluate with Gemini
        const feedback = await evaluateAnswer({
            question: question.question,
            userAnswer,
            role: interview.role,
            difficulty: interview.difficulty,
        });

        // save answer
        interview.answers.push({
            questionId,
            userAnswer,
            score: feedback.score,
            feedback: {
                strengths: feedback.strengths,
                weaknesses: feedback.weaknesses,
                missingConcepts: feedback.missingConcepts,
                idealAnswer: feedback.idealAnswer,
            },
        });

        await interview.save();

        return res.status(200).json({
            success: true,
            feedback,
        });
    } catch(error) {
        console.error(
        "EVALUATION ERROR:"
        );

        console.dir(
            error,
            {
                depth: null,
            }
        );


        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getInterviewResults = async (req,res) => {
    try {
        const {
            interviewId
        } = req.params;

        const interview = await Interview.findById(
            interviewId
        );

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found",
            });
        }

        // calculate score 

        const totalScore = interview.answers
        .reduce(
            (
                sum,
                answer
            ) => sum + answer.score,
            0
        );

        const averageScore = interview.answers
        .length > 0
        ? (
            totalScore / interview.answers
            .length
        ).toFixed(1)
        : 0;

        // mark completed

        interview.status = "completed";

        interview.averageScore = averageScore;

        interview.completedAt = new Date();

        await interview.save();

        return res.status(200).json({
            success: true,
            interview,
        });
    } catch (error) {
        console.error(
            "RESULT ERROR:"
        );

        console.dir(
            error,
            {
                depth: null,
            }
        );
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// interview history

export const getInterviewHistory = async (req,res) => {
    try {
        const interviews = await Interview
        .find({
            userId: 
            req.user._id,
        })
        .sort({
            createdAt: 
            -1,
        });

        return res.status(200).json({
            success: true,
            interviews,
        }); 
    } catch (error) {
        console.error(
            "HISTORY ERROR:"
        );

        console.dir(
            error,
            {
                depth: null,
            }
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// dashboard stats

export const getDashboardStats = async (req,res) => {
    try {
        const interviews = await Interview.find({
            userId: req.user._id,
        })
        .sort({
            createdAt: -1,
        });
        const totalInterviews = interviews.length;

        const averageScore = totalInterviews > 0
        ? (
            interviews.reduce(
                (
                    sum,
                    interview
                ) => sum + (
                    interview.averageScore || 0
                ),
                0
            )
            /
            totalInterviews
        ).toFixed(1)
        : 0;

        // recent interviews
        const recentInterviews = interviews.slice(
            0,
            5
        );
        return res.status(200).json({
            success: true,
            stats: {
                totalInterviews,
                averageScore,
                recentInterviews,
            },
        });
    } catch (error) {
        console.error(
            "DASHBOARD ERROR:"
        );

        console.dir(
            error,
            {
                depth: null,
            }
        );
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

