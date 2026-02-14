import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { saveEntry } from '../utils/storage';

const DailyCheckIn = ({ onSave, user }) => {
    const [mood, setMood] = useState(5);
    const [sleep, setSleep] = useState(6);
    const [pain, setPain] = useState(2);
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const entry = { mood, sleep, pain, note };
        saveEntry(user, entry);
        onSave();
        // Reset or show success
        setNote('');
        alert('Entry saved!');
    };

    return (
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Daily Check-in</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Mood Slider */}
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                        How is your mood today?
                    </label>
                    <div className="text-center text-4xl mb-4 transition-all transform hover:scale-110 duration-200">
                        {['😭', '😢', '😞', '😔', '😐', '🙂', '😊', '😄', '😁', '🥰'][mood - 1]}
                    </div>
                    <input
                        type="range" min="1" max="10"
                        value={mood} onChange={(e) => setMood(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-lavender-500"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>Rough</span>
                        <span>Okay</span>
                        <span>Amazing</span>
                    </div>
                </div>

                {/* Sleep Hours */}
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                        Hours of Sleep
                    </label>
                    <div className="flex items-center gap-4">
                        <button type="button" onClick={() => setSleep(Math.max(0, sleep - 0.5))} className="p-2 bg-slate-100 rounded-lg">-</button>
                        <span className="font-semibold text-xl w-12 text-center">{sleep}</span>
                        <button type="button" onClick={() => setSleep(sleep + 0.5)} className="p-2 bg-slate-100 rounded-lg">+</button>
                    </div>
                </div>

                {/* Pain Level */}
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                        Physical Pain Level (1-10)
                    </label>
                    <input
                        type="range" min="1" max="10"
                        value={pain} onChange={(e) => setPain(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-lavender-500"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>None</span>
                        <span>Moderate</span>
                        <span>Severe</span>
                    </div>
                    <p className="text-center font-bold text-lavender-600 mt-2">{pain}</p>
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                        Personal Note (Optional)
                    </label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lavender-300 focus:outline-none"
                        placeholder="How are you feeling about your situation?"
                        rows="3"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-lavender-500 hover:bg-lavender-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <Save size={20} />
                    Save Entry
                </button>

            </form>
        </div>
    );
};

export default DailyCheckIn;
