import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast
from "react-hot-toast";

import Navbar
from "../components/common/Navbar";

import useInterviewStore
from "../store/interviewStore";

const InterviewSession =
() => {

  const navigate =
    useNavigate();

  const {
    interview,

    questions,

    currentQuestion,

    saveAnswer,

    nextQuestion,

    previousQuestion,

    evaluateAnswer,

    getResults,

    mode,

    timeRemaining,

    decreaseTimer,
  } =
    useInterviewStore();

  const [answer,
    setAnswer] =
    useState("");

  const question =
    questions[
      currentQuestion
    ];

  /*
   Timer
  */
  useEffect(() => {

    if (
      mode !==
      "interview"
    ) return;

    const timer =
      setInterval(
        () => {

          decreaseTimer();

        },
        1000
      );

    return () =>
      clearInterval(
        timer
      );

  }, [
    mode,
    decreaseTimer,
  ]);

  /*
   Time Format
  */
  const formatTime =
  (seconds) => {

    const mins =
      Math.floor(
        seconds / 60
      );

    const secs =
      seconds % 60;

    return `${mins}:${
      secs < 10
      ? "0"
      : ""
    }${secs}`;
  };

  if (
    !question
  ) {

    return (
      <div className="min-h-screen flex justify-center items-center">

        <h1 className="text-2xl font-bold">

          No Interview Found

        </h1>

      </div>
    );
  }

  const handleNext =
  async () => {

    if (
      !answer.trim()
    ) {

      toast.error(
        "Please answer the question"
      );

      return;
    }

    saveAnswer(
      question.questionId,
      answer
    );

    const result =
      await evaluateAnswer(
        question.questionId,
        answer
      );

    if (
      !result.success
    ) {

      toast.error(
        result.message
      );

      return;
    }

    if (
      interview
      ?.feedbackMode
      ===
      "instant"
    ) {

      toast.success(
        `Score:
        ${result.feedback.score}/10`
      );
    }

    const isLast =
      currentQuestion ===
      questions.length - 1;

    if (
      isLast
    ) {

      await getResults();

      toast.success(
        "Interview Completed"
      );

      navigate(
        "/results"
      );

      return;
    }

    nextQuestion();

    setAnswer("");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Sidebar */}

          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-6 h-fit">

            <h2 className="text-xl font-bold mb-5">

              Interview Progress

            </h2>

            <div className="mb-6">

              <p className="text-sm text-gray-500 mb-2">

                Question
                {" "}
                {
                currentQuestion
                + 1
                }
                {" "}of{" "}
                {
                questions.length
                }

              </p>

              <div className="w-full h-3 rounded-full bg-gray-200">

                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"

                  style={{
                    width:
                    `${
                      (
                        (
                          currentQuestion
                          + 1
                        )
                        /
                        questions.length
                      ) * 100
                    }%`,
                  }}
                />
              </div>

            </div>

            {/* Mode */}

            <div className="mb-5">

              <p className="text-gray-500 text-sm">

                Mode

              </p>

              <h3 className="font-bold capitalize text-lg">

                {
                mode
                }

              </h3>

            </div>

            {/* Timer */}

            {
            mode ===
            "interview"
            && (

            <div className="bg-red-50 rounded-2xl p-5 mb-5">

              <p className="text-red-500 text-sm">

                Time Remaining

              </p>

              <h2 className="text-3xl font-bold text-red-600 mt-2">

                ⏱
                {" "}
                {
                formatTime(
                  timeRemaining
                )
                }

              </h2>

            </div>

            )}

            {/* Question Dots */}

            <div>

              <p className="font-semibold mb-3">

                Questions

              </p>

              <div className="flex flex-wrap gap-3">

                {
                questions.map(
                  (
                    _,
                    index
                  ) => (

                  <div
                    key={index}

                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-semibold ${
                      currentQuestion
                      === index
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                    }`}
                  >

                    {
                    index + 1
                    }

                  </div>
                ))
                }

              </div>

            </div>

          </div>

          {/* Main Content */}

          <div className="lg:col-span-3 bg-white rounded-[32px] shadow-sm border border-gray-100 p-8">

            {/* Metadata */}

            <div className="flex gap-3 mb-6 flex-wrap">

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">

                {
                question.topic
                }

              </span>

              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm">

                {
                question.type
                }

              </span>

              <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">

                {
                question.difficulty
                }

              </span>

            </div>

            {/* Question */}

            <h1 className="text-3xl font-bold leading-relaxed text-slate-800 mb-8">

              {
              question.question
              }

            </h1>

            {/* Answer */}

            <textarea
              rows="12"

              value={answer}

              onChange={(e) =>
                setAnswer(
                  e.target.value
                )
              }

              placeholder="Write your detailed answer here..."

              className="w-full border border-gray-200 rounded-[28px] p-6 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />

            {/* Buttons */}

            <div className="flex justify-between mt-8">

              {
              mode ===
              "practice"
              && (

              <button
                onClick={
                  previousQuestion
                }

                disabled={
                  currentQuestion
                  === 0
                }

                className="bg-gray-100 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition disabled:opacity-50"
              >

                Previous

              </button>

              )}

              <button
                onClick={
                  handleNext
                }

                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition shadow-md"
              >

                {
                currentQuestion ===
                questions.length
                - 1

                ? "Finish Interview"

                : "Next Question"
                }

              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default
InterviewSession;