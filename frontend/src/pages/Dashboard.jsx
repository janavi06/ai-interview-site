import { motion } from "framer-motion";
import {
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar
from "../components/common/Navbar";

import useAuthStore
from "../store/authStore";

import useInterviewStore
from "../store/interviewStore";

const Dashboard =
() => {

  const navigate =
    useNavigate();

  const user =
    useAuthStore(
      (state) =>
        state.user
    );

  const {
    dashboardStats,

    getDashboardStats,
  } =
    useInterviewStore();

  useEffect(
    () => {

      getDashboardStats();

    },
    []
  );

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Hero */}

        <motion.div 
        initial={{
          opacity: 0,
          y: 40,
        }} 
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[32px] p-10 text-white shadow-xl mb-8"
        >

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">

            <div>

              <p className="text-blue-100 text-sm mb-2">

                AI Powered Mock Interviews

              </p>

              <h1 className="text-4xl font-bold mb-3">

                Welcome back,
                {" "}
                {
                user?.fullName
                }

              </h1>

              <p className="text-blue-100 max-w-2xl">

                Practice real-world software engineering interviews,
                improve your weak areas, and become interview-ready.

              </p>

            </div>

            <button
              onClick={() =>
                navigate(
                  "/interview/setup"
                )
              }

              className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition shadow-md"
            >

              Start Mock Interview

            </button>

          </div>
        </motion.div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

          {/* Total Interviews */}

          <motion.div 
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          className="bg-white rounded-[28px] p-7 shadow-sm, border border-gray-100"
          >

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-500 text-sm">

                  Total Interviews

                </p>

                <h2 className="text-5xl font-bold mt-4 text-slate-800">

                  {
                  dashboardStats
                  ?.totalInterviews
                  || 0
                  }

                </h2>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">

                🎯

              </div>

            </div>
          </motion.div>

          {/* Average Score */}

          <div className="bg-white rounded-[28px] p-7 shadow-sm hover:shadow-lg transition border border-gray-100">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-500 text-sm">

                  Average Score

                </p>

                <h2 className="text-5xl font-bold mt-4 text-green-600">

                  {
                  dashboardStats
                  ?.averageScore
                  || 0
                  }

                  <span className="text-2xl text-gray-400">

                    /10

                  </span>

                </h2>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">

                📈

              </div>

            </div>
          </div>

          {/* Improvement */}

          <div className="bg-white rounded-[28px] p-7 shadow-sm hover:shadow-lg transition border border-gray-100">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-500 text-sm">

                  Interview Goal

                </p>

                <h2 className="text-2xl font-bold mt-4 text-slate-800">

                  Keep Improving

                </h2>

                <p className="text-gray-500 text-sm mt-2">

                  Practice daily for better confidence.

                </p>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl">

                🚀

              </div>

            </div>
          </div>

        </div>

        {/* Recent Interviews */}

        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8">

          <div className="flex justify-between items-center mb-6">

            <div>

              <h2 className="text-2xl font-bold text-slate-800">

                Recent Interviews

              </h2>

              <p className="text-gray-500 mt-1">

                Your latest interview activity

              </p>

            </div>

            <button
              onClick={() =>
                navigate(
                  "/history"
                )
              }

              className="text-blue-600 font-semibold hover:underline"
            >

              View All

            </button>

          </div>

          {
          dashboardStats
          ?.recentInterviews
          ?.length === 0 ? (

            <div className="text-center py-20">

              <div className="text-6xl mb-4">

                🤖

              </div>

              <h3 className="text-2xl font-bold text-slate-700">

                No Interviews Yet

              </h3>

              <p className="text-gray-500 mt-2">

                Start your first AI interview today.

              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {
              dashboardStats
              ?.recentInterviews
              ?.map(
                (
                  interview
                ) => (

                <div
                  key={
                    interview._id
                  }

                  className="border border-gray-100 rounded-[24px] p-6 hover:bg-slate-50 transition flex flex-col md:flex-row justify-between gap-4"
                >

                  <div>

                    <h3 className="text-xl font-bold text-slate-800">

                      {
                      interview.role
                      }

                    </h3>

                    <div className="flex gap-3 mt-3 flex-wrap">

                      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">

                        {
                        interview
                        .difficulty
                        }

                      </span>

                      <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm">

                        {
                        interview
                        .mode
                        }

                      </span>

                      <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">

                        {
                        interview
                        .status
                        }

                      </span>

                    </div>
                  </div>

                  <div className="text-right">

                    <h2 className="text-3xl font-bold text-blue-600">

                      {
                      interview
                      .averageScore
                      || 0
                      }

                      /10

                    </h2>

                    <p className="text-gray-400 mt-2 text-sm">

                      {
                      new Date(
                        interview.createdAt
                      )
                      .toLocaleDateString()
                      }

                    </p>

                  </div>

                </div>
              ))
              }

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default
Dashboard;