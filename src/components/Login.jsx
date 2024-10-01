import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); 

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await fetch(
                    "https://www.googleapis.com/oauth2/v1/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`,
                        },
                    }
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch user info");
                }

                const userData = await res.json();
                const { email, name } = userData;
                console.log(userData);
                localStorage.setItem("email", email);
                localStorage.setItem("username", name);

                toast.success("Logged in successfully with Google!");
                setTimeout(() => navigate("/"), 500);
            } catch (err) {
                toast.error("Google login failed!");
                console.error(err);
            }
        }
    });

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://netflix-backend-n3us.onrender.com/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                throw new Error("Failed to login");
            }
            const data = await res.json();
            localStorage.setItem("username", data.data.username);
            localStorage.setItem("email", data.data.email);

            toast.success("Login successful!");
            setTimeout(() => navigate("/"), 500);
        } catch (err) {
            toast.error("Username or password is incorrect");
            console.error(err);
            console.error("Error during login:", err);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className='flex items-center justify-center min-h-screen relative'>
            <Toaster />
            <img
                src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className='relative z-10 bg-black bg-opacity-85 p-10 rounded-md w-full max-w-md mx-4'>
                <form className='space-y-8' onSubmit={handleEmailLogin}>
                    <h1 className='text-white text-3xl font-bold'>Sign In</h1>
                    <div className='space-y-4'>
                        <input
                            type="text"
                            placeholder="Email"
                            className='w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password"
                                className='w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-200 focus:outline-none"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /><path d="m2 2 20 20" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M1 12S4.5 4 12 4s11 8 11 8-3.5 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white rounded-md py-3 font-bold hover:bg-red-700 transition duration-300"
                        >
                            Sign In
                        </button>
                        <div className="flex items-center justify-center text-gray-500">
                            <hr className="flex-grow border-gray-600" />
                            <span className="px-3">Or</span>
                            <hr className="flex-grow border-gray-600" />
                        </div>
                        <button
                            type="button"
                            onClick={() => handleGoogleLogin()}
                            className='bg-white text-black p-2 rounded-md hover:bg-gray-200 transition duration-300'
                        >
                            <div className='flex gap-2 justify-center'>
                                <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" className='w-6 h-6' />
                                Continue with Google
                            </div>
                        </button>
                    </div>
                </form>
                <div className='mt-10 text-gray-400'>
                    <p>New to Netflix? <Link to={'/signup'} className='text-red-600 hover:underline'>Sign up</Link></p>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        </div>
    );
};

export default Login;