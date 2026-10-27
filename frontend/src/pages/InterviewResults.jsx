import {
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar
from "../components/common/Navbar";

import useInterviewStore
from "../store/interviewStore";

const InterviewResults =
() => {

  const navigate =
    useNavigate();

  const results =
    useInterviewStore(
      (state) =>
        state.results
    );

  useEffect(() => {

    if (
      !results
    ) {

      navigate(
        "/dashboard"
      );
    }

  }, []);

  if (
    !results
  ) return null;

  /*
   Score Color
  */
  const getScoreColor =
  (score) => {

    if (
      score >= 8
    ) {

      return "text-green-600";
    }

    if (
      score >= 5
    ) {

      return "text-yellow-600";
    }

    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[32px] p-10 text-white shadow-xl mb-8">

          <div className="flex flex-col lg:flex-row justify-between gap-6">

            <div>

              <p className="text-blue-100 text-sm mb-2">

                AI Mock Interview Report

              </p>

              <h1 className="text-4xl font-bold">

                Interview Results

              </h1>

              <p className="text-blue-100 mt-3">

                Role:
                {" "}
                {
                results.role
                }

              </p>

            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-[28px] p-8 min-w-[220px]">

              <p className="text-blue-100">

                Average Score

              </p>

              <h2 className="text-6xl font-bold mt-2">

                {
                results.averageScore
                || 0
                }

                <span className="text-2xl">

                  /10

                </span>

              </h2>

            </div>

          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-[28px] p-7 shadow-sm border border-gray-100">

            <p className="text-gray-500 text-sm">

              Questions Attempted

            </p>

            <h2 className="text-5xl font-bold text-slate-800 mt-3">

              {
              results.answers
              ?.length
              }

            </h2>

          </div>

          <div className="bg-white rounded-[28px] p-7 shadow-sm border border-gray-100">

            <p className="text-gray-500 text-sm">

              Difficulty

            </p>

            <h2 className="text-3xl font-bold text-purple-600 mt-3">

              {
              results.difficulty
              }

            </h2>

          </div>

          <div className="bg-white rounded-[28px] p-7 shadow-sm border border-gray-100">

            <p className="text-gray-500 text-sm">

              Mode

            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-3 capitalize">

              {
              results.mode
              }

            </h2>

          </div>

        </div>

        {/* Question Analysis */}

        <div className="space-y-6">

          <h2 className="text-3xl font-bold text-slate-800 mb-4">

            Question Analysis

          </h2>

          {
          results.answers
          ?.map(
            (
              answer,
              index
            ) => (

            <div
              key={index}

              className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8"
            >

              {/* Header */}

              <div className="flex flex-col lg:flex-row justify-between gap-5 mb-6">

                <div>

                  <h3 className="text-2xl font-bold text-slate-800">

                    Question
                    {" "}
                    {
                    index + 1
                    }

                  </h3>

                </div>

                <div className={`text-4xl font-bold ${getScoreColor(answer.score)}`}>

                  {
                  answer.score
                  }

                  /10

                </div>

              </div>

              {/* User Answer */}

              <div className="mb-6">

                <h4 className="font-bold text-slate-700 mb-3">

                  Your Answer

                </h4>

                <div className="bg-slate-50 rounded-2xl p-5 text-gray-700 leading-relaxed">

                  {
                  answer.userAnswer
                  }

                </div>

              </div>

              {/* Strengths */}

              <div className="mb-6">

                <h4 className="font-bold text-green-600 mb-3">

                  Strengths

                </h4>

                <ul className="space-y-2">

                  {
                  answer.feedback
                  ?.strengths
                  ?.map(
                    (
                      item,
                      i
                    ) => (

                    <li
                      key={i}

                      className="bg-green-50 text-green-700 rounded-xl px-4 py-3"
                    >

                      ✓
                      {" "}
                      {item}

                    </li>
                  ))
                  }

                </ul>

              </div>

              {/* Weaknesses */}

              <div className="mb-6">

                <h4 className="font-bold text-red-500 mb-3">

                  Areas to Improve

                </h4>

                <ul className="space-y-2">

                  {
                  answer.feedback
                  ?.weaknesses
                  ?.map(
                    (
                      item,
                      i
                    ) => (

                    <li
                      key={i}

                      className="bg-red-50 text-red-600 rounded-xl px-4 py-3"
                    >

                      ⚠
                      {" "}
                      {item}

                    </li>
                  ))
                  }

                </ul>

              </div>

              {/* Missing Concepts */}

              <div className="mb-6">

                <h4 className="font-bold text-orange-600 mb-3">

                  Missing Concepts

                </h4>

                <div className="flex flex-wrap gap-3">

                  {
                  answer.feedback
                  ?.missingConcepts
                  ?.map(
                    (
                      concept,
                      i
                    ) => (

                    <span
                      key={i}

                      className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full"
                    >

                      {
                      concept
                      }

                    </span>
                  ))
                  }

                </div>

              </div>

              {/* Ideal Answer */}

              <div>

                <h4 className="font-bold text-blue-600 mb-3">

                  Ideal Professional Answer

                </h4>

                <div className="bg-blue-50 rounded-[24px] p-6 leading-relaxed text-slate-700">

                  {
                  answer.feedback
                  ?.idealAnswer
                  }

                </div>

              </div>

            </div>
          ))
          }

        </div>

        {/* CTA */}

        <div className="mt-10 text-center">

          <button
            onClick={() =>
              navigate(
                "/interview/setup"
              )
            }

            className="bg-blue-600 text-white px-10 py-4 rounded-[24px] font-semibold hover:bg-blue-700 transition shadow-md"
          >

            Take Another Interview

          </button>

        </div>

      </div>
    </div>
  );
};

export default
InterviewResults;