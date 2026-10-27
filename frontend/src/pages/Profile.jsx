import { useEffect } from "react";
import Navbar from "../components/common/Navbar";
import useAuthStore from "../store/authStore";


const Profile = () => {

    const {
        profile,
        getProfile,
    } = useAuthStore();

    useEffect(
        () => {
            getProfile();
        },
        []
    );

    if (
        !profile 
    ) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading....
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-4xl font-bold mb-8">
                    Profile
                </h1>
                <div className="bg-white rounded-3xl shadow-md p-8">
                    <div className="space-y-6">
                        <div>
                            <p className="text-gray-500">
                                Full Name
                            </p>
                            <h2 className="text-2xl font-bold">
                                {
                                    profile.fullName
                                }
                            </h2>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Email
                            </p>
                            <h2 className="text-xl font-medium">
                                {
                                    profile.email
                                }
                            </h2>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Joined
                            </p>
                            <h2 className="text-xl font-medium">
                                {
                                    new Date(
                                        profile.joinedAt
                                    )
                                    .toLocaleDateString
                                }
                            </h2>
                        </div>

                        <div className="grid grid-cols-3 gap-5 mt-8">
                            <div className="bg-blue-50 rounded-2xl p-5">
                                <p className="text-gray-500">
                                    Interviews
                                </p>
                                <h2 className="text-3xl font-bold text-blue-600">
                                    {
                                        profile.totalInterviews
                                    }
                                </h2>
                            </div>
                            <div className="bg-green-50 rounded-2xl p-5">
                                <p className="text-gray-500">
                                    Avg Score
                                </p>
                                <h2 className="text-3xl font-bold text-green-600">
                                    {
                                        profile.averageScore
                                    }
                                    /10
                                </h2>
                            </div>
                            <div className="bg-purple-50 rounded-2xl p-5">
                                <p className="text-gray-500">
                                    Preferred Mode
                                </p>
                                <h2 className="text-2xl font-bold text-purple-600">
                                    {
                                        profile.preferredMode
                                    }
                                </h2>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;