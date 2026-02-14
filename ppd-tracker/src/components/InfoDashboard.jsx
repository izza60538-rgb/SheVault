import React from 'react';
import { BookOpen, Heart, Shield, Activity } from 'lucide-react';

const InfoDashboard = ({ onStartTracking }) => {
    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-lavender-100 to-white p-8 rounded-3xl border border-lavender-100">
                <h2 className="text-2xl font-bold text-lavender-800 mb-2">Welcome to your Safe Space 💜</h2>
                <p className="text-slate-600 leading-relaxed">
                    SheVault is designed to help you track your journey through motherhood.
                    Understanding your emotions and physical well-being is the first step towards healing.
                </p>
                <button
                    onClick={onStartTracking}
                    className="mt-6 px-6 py-3 bg-lavender-500 hover:bg-lavender-600 text-white rounded-xl font-semibold shadow-md shadow-lavender-200 transition-all flex items-center gap-2"
                >
                    <Activity size={20} />
                    Start Daily Check-in
                </button>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* What is PPD? */}
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center mb-4">
                        <BookOpen className="text-sage-600" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">What is Postpartum Depression?</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        It's a common medical condition that affects many new mothers. It can cause strong feelings of sadness,
                        anxiety, and exhaustion that make it difficult to care for yourself and your baby.
                        <br /><br />
                        <strong>You are not alone, and it is not your fault.</strong>
                    </p>
                </div>

                {/* Why Track? */}
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-10 h-10 bg-lavender-100 rounded-full flex items-center justify-center mb-4">
                        <Shield className="text-lavender-600" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Why Track Your Symptoms?</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Tracking helps identifying patterns in your mood, sleep, and pain.
                        Consistent logging allows you to see improvements over time and helps healthcare providers
                        understand your condition better.
                    </p>
                </div>
            </div>

            {/* Emergency Resources */}
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <Heart className="text-indigo-600" size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-indigo-900 mb-1">Need Immediate Help?</h3>
                        <p className="text-indigo-700 text-sm mb-3">
                            If you have thoughts of harming yourself or your baby, please reach out immediately.
                        </p>
                        <div className="flex gap-3 text-sm font-semibold">
                            <span className="px-3 py-1 bg-white text-indigo-600 rounded-lg border border-indigo-200">
                                🚑 Call 181
                            </span>
                            <span className="px-3 py-1 bg-white text-indigo-600 rounded-lg border border-indigo-200">
                                📞 112 (Crisis Line)
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoDashboard;
