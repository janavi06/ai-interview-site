import { useEffect } from "react";
import Navbar from "../components/common/Navbar";
import useInterviewStore  from "../store/interviewStore.js";


const History = () => {
    const {history, getHistory,} = useInterviewStore();

    useEffect(
        () => {
            getHistory();
        },
        []
    );
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>
            <div className="max-w-6xl mx-auto p-8">
                <h1 className="text-4xl font-bold mb-2">
                    Interview History
                </h1>
                <p className="text-gray-500 m-8">
                    View all yur previous mock interviews
                </p>
                {
                    history.length
                    === 0 ? (
                        <div className="bg-white rounded-3l p-10 shadow-md text-center">
                            <h2 className="text-2xl font-semibold">
                                No Interviews Yet
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Complete your first mock interview.
                            </p>

                        </div>
                    ): (
                        <div className="space-y-5">
                            {
                                history.map(
                                    (
                                        interview
                                    ) => (
                                        <div
                                        key={
                                            interview._id
                                        }
                                        className="bg-white rounded-3xl shadow-md p-6 flex justify-between items-center"
                                        >
                                            <div>
                                                <h2 className="text-xl font-bold">
                                                    {
                                                        interview.role
                                                    }
                                                </h2>
                                                <p className="text-gray-500 mt-2">
                                                    Difficulty: 
                                                    {" "}
                                                    {
                                                        interview.difficulty
                                                    }
                                                    {" | "}
                                                    Mode: 
                                                    {" "}
                                                    {
                                                        interview.mode
                                                    }
                                                </p>

                                                <p className="text-gray-400 text-sm mt-2"> 
                                                    {
                                                        new Date(
                                                            interview.createdAt
                                                        ).toLocaleDateString()
                                                    }
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <h3 className="text-3xl font-bold text-blue-600">
                                                    {
                                                        interview.averageScore || 0
                                                    }
                                                    /10

                                                </h3>
                                                <p className="text-gray-500">
                                                    {interview.status}
                                                </p>
                                            </div>

                                        </div>
                                    )
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default History;