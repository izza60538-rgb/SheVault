import React from 'react';
import { analyzeTrends } from '../utils/analyzer';

const AnalysisView = ({ entries }) => {
    const result = analyzeTrends(entries);

    if (!entries || entries.length === 0) {
        return (
            <div className="p-6 bg-white rounded-2xl border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-700">Insights</h3>
                <p className="text-slate-500 mt-2">Start tracking to see your insights.</p>
            </div>
        );
    }

    // Handle insufficient data case differently from analysis results
    if (result.status === 'insufficient_data') {
        return (
            <div className="p-6 bg-white rounded-2xl border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-700">Gathering Insights...</h3>
                <p className="text-slate-500 mt-2 text-sm">{result.message}</p>
                <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-lavender-400 h-2 rounded-full" style={{ width: `${(entries.length / 3) * 100}%` }}></div>
                </div>
            </div>
        );
    }

    return (
        <div className={`p-6 rounded-2xl border ${result.color} transition-all`}>
            <h3 className="text-xl font-bold mb-2">{result.title}</h3>
            <p className="mb-4">{result.message}</p>

            {/* Dynamic Recommendation */}
            {result.status === 'consult_doctor' ? (
                <a href="#" className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                    Find Professional Help
                </a>
            ) : (
                <div className="text-sm font-medium opacity-80">
                    Keep up the good work! We are proud of you.
                </div>
            )}
        </div>
    );
};

export default AnalysisView;
