import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [showReEnterPassword, setShowReEnterPassword] = useState(false); 
    const [, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailSignUp = async (e) => {
        e.preventDefault();

        if (password !== reEnterPassword) {
            setErrorMessage('Passwords do not match');
            toast.error('Passwords do not match');
            return;
        }

        try {
            const res = await fetch('https://netflix-backend-n3us.onrender.com/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error('Signup failed:', errorData.message);
                setErrorMessage(errorData.message);
                toast.error(errorData.message);
                return;
            }

            toast.success('Signup successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 500);

        } catch (err) {
            console.error('Error during signup:', err);
            setErrorMessage('An error occurred during signup. Please try again.');
            toast.error('An error occurred during signup');
        }
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
                <form className='space-y-8' onSubmit={handleEmailSignUp}>
                    <h1 className='text-white text-3xl font-bold'>Sign Up</h1>
                    <div className='space-y-4'>
                        <input
                            type="text"
                            placeholder="Username"
                            className='w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
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
                            <span
                                onClick={() => setShowPassword(prev => !prev)} 
                                className="absolute right-3 top-3 cursor-pointer"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye">
                                        <path d="M1 12s6-9 11-9 11 9 11 9-6 9-11 9-11-9-11-9z" />
                                        <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off">
                                        <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                                        <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                                        <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                                        <path d="m2 2 20 20" />
                                    </svg>
                                )}
                            </span>
                        </div>
                        <div className="relative">
                            <input
                                type={showReEnterPassword ? "text" : "password"}
                                placeholder="Re-enter Password"
                                className='w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400'
                                value={reEnterPassword}
                                onChange={(e) => setReEnterPassword(e.target.value)}
                                required
                            />
                            <span
                                onClick={() => setShowReEnterPassword(prev => !prev)} 
                                className="absolute right-3 top-3 cursor-pointer"
                            >
                                {showReEnterPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye">
                                        <path d="M1 12s6-9 11-9 11 9 11 9-6 9-11 9-11-9-11-9z" />
                                        <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off">
                                        <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                                        <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                                        <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                                        <path d="m2 2 20 20" />
                                    </svg>
                                )}
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white rounded-md py-3 font-bold hover:bg-red-700 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className='mt-10 text-gray-400'>
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className='text-red-600 font-semibold'>Login here.</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
