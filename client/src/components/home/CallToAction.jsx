import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CallToAction = () => {
    const navigate = useNavigate();
    const { token } = useSelector(state => state.auth);

    const handleGetStarted = () => {
        if (token) {
            // User is logged in, go to dashboard
            navigate('/app');
        } else {
            // User is not logged in, go to login page
            navigate('/login');
        }
    };

    return(
        <>
        <div className="max-w-4xl py-10 md:pl-12 md:w-full max-md:text-center mx-2 md:mx-auto flex flex-col md:flex-row items-center justify-between text-left bg-gradient-to-b from-[#d9d6e6] to-[#e6e4ee] rounded-2xl p-10 text-black mt-30">
                <div>
                    <h1
                        className="text-4xl md:text-[28px] md:leading-[38px] font-semibold bg-gradient-to-r from-black to-[#2c2c2d] text-transparent bg-clip-text">
                        Ready to try-out this Resume Builder?
                    </h1>
                    <p className="bg-gradient-to-r from-black to-[#2c2c2d] text-transparent bg-clip-text text-lg">
                        Your next favourite resume is just one click away.
                    </p>
                </div>
                <button 
                    onClick={handleGetStarted}
                    className="px-12 py-3 text-black-700 bg-green-400 rounded-full text-sm mt-4 hover:bg-green-600 transition">
                    Get Started
                </button>
            </div>
        </>
    )
}
export default CallToAction;