import React, { useState, useEffect } from 'react';
import { User, LogOut, Trash2, Save } from 'lucide-react';
import { getUserProfile, updateUserProfile } from '../utils/storage';

const Profile = ({ username, onLogout, onDeleteAccount }) => {
    const [bio, setBio] = useState('');
    const [age, setAge] = useState('');
    const [babyAge, setBabyAge] = useState('');
    const [medicalConditions, setMedicalConditions] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const profile = getUserProfile(username);
        setBio(profile.bio || '');
        setAge(profile.age || '');
        setBabyAge(profile.babyAge || '');
        setMedicalConditions(profile.medicalConditions || '');
    }, [username]);

    const handleSaveBio = () => {
        updateUserProfile(username, { bio, age, babyAge, medicalConditions });
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-lavender-100 shadow-sm text-center">
                <div className="w-24 h-24 bg-lavender-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                    <User className="text-lavender-500" size={48} />
                </div>
                <h2 className="text-2xl font-bold text-lavender-800">@{username}</h2>
                <p className="text-slate-400 text-sm mt-1">Member since 2026</p>

                <div className="mt-6 text-left">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-semibold text-slate-600">Personal Details</label>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-xs text-lavender-600 hover:text-lavender-800 font-medium"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {isEditing ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Your Age</label>
                                    <input
                                        type="number"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="w-full p-2 border border-lavender-200 rounded-lg focus:ring-2 focus:ring-lavender-300 focus:outline-none text-slate-700 text-sm"
                                        placeholder="28"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Baby's Age</label>
                                    <input
                                        type="text"
                                        value={babyAge}
                                        onChange={(e) => setBabyAge(e.target.value)}
                                        className="w-full p-2 border border-lavender-200 rounded-lg focus:ring-2 focus:ring-lavender-300 focus:outline-none text-slate-700 text-sm"
                                        placeholder="3 months"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Relevant Medical Conditions</label>
                                <textarea
                                    value={medicalConditions}
                                    onChange={(e) => setMedicalConditions(e.target.value)}
                                    className="w-full p-2 border border-lavender-200 rounded-lg focus:ring-2 focus:ring-lavender-300 focus:outline-none text-slate-700 text-sm"
                                    rows="2"
                                    placeholder="e.g., PPD history, Thyroid issues..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Bio</label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="w-full p-3 border border-lavender-200 rounded-lg focus:ring-2 focus:ring-lavender-300 focus:outline-none text-slate-700 text-sm"
                                    rows="3"
                                    placeholder="Share a little about your journey..."
                                />
                            </div>

                            <button
                                onClick={handleSaveBio}
                                className="w-full py-2 bg-lavender-500 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                            >
                                <Save size={16} /> Save Changes
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                                <div className="grid grid-cols-2 gap-4 border-b border-slate-200 pb-3">
                                    <div>
                                        <span className="block text-xs text-slate-400 uppercase tracking-wider">Age</span>
                                        <span className="text-sm font-medium text-slate-700">{age || '-'}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-400 uppercase tracking-wider">Baby's Age</span>
                                        <span className="text-sm font-medium text-slate-700">{babyAge || '-'}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-xs text-slate-400 uppercase tracking-wider">Medical Conditions</span>
                                    <span className="text-sm font-medium text-slate-700">{medicalConditions || 'None listed'}</span>
                                </div>
                            </div>

                            <div>
                                <span className="block text-xs text-slate-400 uppercase tracking-wider mb-1">Bio</span>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 text-sm italic min-h-[60px]">
                                    "{bio || "Write something about yourself..."}"
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                <button
                    onClick={onLogout}
                    className="w-full py-4 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-xl font-medium transition-all flex items-center justify-center gap-3 shadow-sm"
                >
                    <LogOut size={20} />
                    Log Out
                </button>

                <button
                    onClick={() => {
                        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone and all your data will be lost.')) {
                            onDeleteAccount();
                        }
                    }}
                    className="w-full py-4 bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 rounded-xl font-medium transition-all flex items-center justify-center gap-3"
                >
                    <Trash2 size={20} />
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default Profile;
