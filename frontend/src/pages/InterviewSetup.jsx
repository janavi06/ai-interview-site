import {useForm,} from "react-hook-form";
import {useNavigate,} from "react-router-dom";
import toast from "react-hot-toast";
import useInterviewStore from "../store/interviewStore";
import Navbar from "../components/common/Navbar";


const InterviewSetup = () => {

    const navigate = useNavigate();

    const {register, handleSubmit, } = useForm();

    const startInterview = useInterviewStore(
        (state) => state.startInterview
    );

    const loading = useInterviewStore(
        (state) => state.loading
    );

    const onSubmit = async (data) => {
        data.numberOfQuestions = Number(
            data.numberOfQuestions
        );

        const result = await startInterview(
            data
        );

        if (
            result.success
        ) {
            toast.success(
                "Interview Started"
            );

            navigate(
                "/interview/session"
            );
        }  else {
            toast.error(
                result.message
            );
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="max-w-3xl mx-auto p-8">
                <h1 className="text-4xl font-bold mb-2">
                    Setup Interview
                </h1>
                <p className="text-gray-500 mb-8">
                    Configure your AI interview
                </p>
                <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-3xl shadow-md space-y-6"
                >

                    {/* Role */}

                    <div>
                        <label className="font-medium">
                            Role
                        </label>

                        <select
                        {...register(
                            "role"
                        )}
                        className="w-full border rounded-xl p-3 mt-2"
                        >
                            <option> Frontend Developer</option>

                            <option>Backend Developer</option>

                            <option>Full Stack Developer</option>
                            <option>React Developer</option>
                            <option>Node.js Developer</option>
                            <option>.NET Developer </option>
                        </select>
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="font-medium">
                            Experience Level
                        </label>

                        <select
                        {...register(
                            "experienceLevel"
                        )}
                        className="w-full border rounded-xl p-3 mt-2"
                        >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>

                        </select>
                    </div>

                    {/* Difficulty */}

                    <div>
                        <label className="font-medium">
                            Difficulty
                        </label>

                        <select
                        {...register(
                            "difficulty"
                        )}
                        className="w-full border rounded-xl p-3 mt-2"
                        >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>

                    {/* interview mode */}

                    <div>
                        <label className="font-medium block mb-3">
                            Interview Mode
                        </label>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="cursor-pointer">
                                <input 
                                type="radio"
                                value="practice"

                                defaultChecked

                                {...register("mode")}
                                className="hidden peer"
                                />
                                <div className="border rounded-2xl p-5 transition peer-checked:border-blue-600 peer-checked:bg-blue-50">
                                    <h3 className="font-bold text-lg">
                                        Practice Mode
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Go back, edit answers,
                                        no pressure.
                                    </p>
                                </div>
                            </label>

                            <label className="cursor-pointer" >
                                <input
                                type="radio"
                                value="interview"
                                {...register("mode")}
                                className="hidden peer"
                                />
                                <div className="border rounded-2xl p-5 transition peer-checked:border-blue-600 peer-checked:bg-blue-50">
                                    <h3 className="font-bold text-lg">
                                        Interview Mode
                                    </h3>
                                    <p className="text-s, text-gray-500 mt-2">
                                        Real interview pressuer,
                                        timer, locked answers.
                                    </p>
                                </div>
                            </label>
                        </div>

                    </div>

                    {/* questions */}
                    <div>
                        <label className="font-medium">
                            Number of Questions
                        </label>
                        <input
                        type="number"
                        defaultValue={5}

                        {...register(
                            "numberOfQuestions"
                        )}
                        className="w-full border rounded-xl p-3 mt-2"
                        />
                    </div>

                    {/* feedback */}

                    <div>
                        <label className="font-medium">
                            Feedback Mode
                        </label>

                        <select
                        {...register(
                            "feedbackMode"
                        )}
                        className="w-full border rounded-xl p-3 mt-2"
                        >
                            <option value="instant">
                                Instant Feedback
                            </option>
                            <option value="end">
                                End Interview Feedback
                            </option>
                        </select>
                    </div>

                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-4 rounded-xl font-semibold"
                    >
                        {loading
                        ? "Generating Questios..."
                        : "Start Interview"
                        }

                    </button>

                </form>
            </div>

            
        </div>
    );
};
export default InterviewSetup;