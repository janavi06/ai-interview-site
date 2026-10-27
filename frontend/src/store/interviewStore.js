import {create} from "zustand";
import API from "../api/axios.js";


const useInterviewStore = create((set) => ({
    interview: null,
    questions: [],
    currentQuestion: 0,
    loading: false,
    answers: [],
    mode: "practice",
    timeRemaining: 0,
    results: null,
    history: [],
    dashboardStats: null,

    // start interview

    startInterview: async(formData) => {
        try {
            set({
                loading: true,
            });

            const response = await API.post(

                "/interviews/start",
                formData
            );

            const interview = response.data.interview;

            set({
                interview,

                questions: interview.questions,

                currentQuestion: 0,

                answers:[],

                mode: interview.mode,

                timeRemaining: interview.totalQuestions
                * 120,

                loading: false,
            });

            return {
                success: true,
            };
        } catch (error) {
            set({
                loading: false,
            });

            return {
                success:false,
                message: error.response
                ?.data
                ?.message || "Failed to start interview",
            };
        }
    },

    // evaluate answer

    evaluateAnswer: async (questionId, userAnswer) => {
        try {
            const interview = useInterviewStore
            .getState()
            .interview;

            const response = await API.post(
                "/interviews/evaluate",
                {
                    interviewId: interview._id,
                    questionId,
                    userAnswer,
                }
            );

            return {
                success: true,
                feedback: response.data.feedback,
            };
        } catch(error) {
            return {
                success: false,
                message: error.response
                ?.data
                ?.message || "Evaluation failed",
            };
        }
    },

    // save answer

    saveAnswer: (questionId, answer) => {
        set((state) => {
            const existing = state.answers.find(
                (a) => a.questionId === questionId
            );

            if (existing) {
                return {
                    answers: 
                    state.answers.map(
                        (a) => a.questionId === questionId
                        ? {
                            ...a,
                            userAnswer: answer,
                        }
                        : a
                    ),
                };
            }

            return {
                answers: [
                    ...state.answers,
                    {
                        questionId,
                        userAnswer: answer,
                    },
                ],
            };
        });
    },

    // next questions

    nextQuestion: () => {
        set((state) => ({
            currentQuestion: state.currentQuestion + 1,
        }))
    },

    // previous questions

    previousQuestion: () => {
        set((state) => ({
            currentQuestion: 
            state.currentQuestion > 0
            ? state.currentQuestion - 1
            : 0,
        }));
    },

    // Timer

    decreaseTimer: () => {
        set((state) => ({
            timeRemaining:
            state.timeRemaining > 0
            ? state.timeRemaining - 1
            : 0,
        }));
    },

    // get Results

    getResults: async () => {
        try {
            const interview = useInterviewStore
            .getState()
            .interview;

            const response = await API.get(
                `/interviews/results/${interview._id}`
            );

            set({
                results: 
                response.data
                .interview,
            });

            return {
                success: true,
            };
        }   catch (error) {
                return {
                    success: false,
                    message: error.response
                    ?.data 
                    ?.message || "Failed to load results",
                };
            }
    },

    // get History 

    getHistory: async () => {
        try {
            const response = await API.get(
                "/interviews/history"
            );

            set({
                history: 
                response.data
                .interviews,
            });

            return {
                success: true,
            };
        }  catch(error) {
            return {
                success: false,
                message: error.response 
                ?.data
                ?.message || "Failed to load history",
            };
        }
    },

    // dashboard stats

    getDashboardStats: async () => {
        try {
            const response = await API.get(
                "/interviews/dashboard"
            );

            set({
                dashboardStats: response.data.stats,
            });

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response
                ?.data?.message || "Failed to load dashboard",
            }
        } 
    }
}));

export default useInterviewStore;