import React, { useState } from 'react';
import { Lock, User, ArrowRight, UserPlus, LogIn } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('shevault_users') || '{}');

        if (isSignUp) {
            // Sign Up Logic
            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }
            if (users[username]) {
                setError('Username already exists. Please choose another.');
                return;
            }
            // Save new user
            users[username] = { password }; // In a real app, hash this!
            localStorage.setItem('shevault_users', JSON.stringify(users));
            onLogin(username);
        } else {
            // Login Logic
            const user = users[username];
            if (user && user.password === password) {
                onLogin(username);
            } else {
                setError('Invalid username or password.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-lavender-50 p-4">
            <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md border border-lavender-100 transition-all duration-300">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-lavender-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {isSignUp ? <UserPlus className="text-lavender-600" size={32} /> : <Lock className="text-lavender-600" size={32} />}
                    </div>
                    <h1 className="text-3xl font-bold text-lavender-700">SheVault</h1>
                    <p className="text-slate-400 mt-2">
                        {isSignUp ? 'Create your safe space' : 'Welcome back, Queen'}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-600 ml-1">Username</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-lavender-400" size={20} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lavender-300 focus:outline-none transition-all placeholder:text-slate-300"
                                placeholder="Choose a username"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-600 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-lavender-400" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lavender-300 focus:outline-none transition-all placeholder:text-slate-300"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {isSignUp && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                            <label className="text-sm font-medium text-slate-600 ml-1">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-lavender-400" size={20} />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lavender-300 focus:outline-none transition-all placeholder:text-slate-300"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-4 bg-lavender-500 hover:bg-lavender-600 text-white rounded-xl font-bold text-lg shadow-md shadow-lavender-200 transition-all flex items-center justify-center gap-2 group mt-4"
                    >
                        {isSignUp ? 'Create Account' : 'Enter Vault'}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError('');
                            setPassword('');
                            setConfirmPassword('');
                        }}
                        className="text-sm text-slate-500 hover:text-lavender-600 hover:underline transition-colors block w-full"
                    >
                        {isSignUp
                            ? "Already have an account? Log In"
                            : "New here? Create an Account"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
