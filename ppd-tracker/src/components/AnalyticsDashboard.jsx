import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Calendar, ChevronLeft, ChevronRight, Activity, Moon, Battery, AlertCircle } from 'lucide-react';

const AnalyticsDashboard = ({ entries }) => {
    const [activeTab, setActiveTab] = useState('weekly'); // 'daily', 'weekly', 'monthly'
    const [selectedDate, setSelectedDate] = useState(new Date());

    // --- Helpers ---
    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

    // --- Aggregation Logic ---
    const sortedEntries = useMemo(() => {
        return [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [entries]);

    const weeklyData = useMemo(() => {
        // Last 7 days reversed for chart (oldest to newest)
        return [...sortedEntries].slice(0, 7).reverse().map(e => ({
            date: formatDate(e.date),
            mood: e.mood,
            sleep: e.sleep,
            pain: e.pain
        }));
    }, [sortedEntries]);

    const monthlyStats = useMemo(() => {
        // Simple average for the current month (mock logic for now, using all data matching month)
        const currentMonthToCheck = selectedDate.getMonth();
        const currentYearToCheck = selectedDate.getFullYear();

        const monthEntries = entries.filter(e => {
            const d = new Date(e.date);
            return d.getMonth() === currentMonthToCheck && d.getFullYear() === currentYearToCheck;
        });

        if (monthEntries.length === 0) return { avgMood: 0, avgSleep: 0, totalEntries: 0 };

        const totalMood = monthEntries.reduce((sum, e) => sum + e.mood, 0);
        const totalSleep = monthEntries.reduce((sum, e) => sum + e.sleep, 0);

        return {
            avgMood: (totalMood / monthEntries.length).toFixed(1),
            avgSleep: (totalSleep / monthEntries.length).toFixed(1),
            totalEntries: monthEntries.length
        };
    }, [entries, selectedDate]);


    // --- Renderers ---

    const renderDailyView = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-700 mb-4">Daily Logs</h3>
            {sortedEntries.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No entries yet. Start tracking!</p>
            ) : (
                sortedEntries.map(entry => (
                    <div key={entry.id} className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <span className="text-xs font-semibold text-slate-400 uppercase">{new Date(entry.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                <div className="text-sm font-medium text-slate-700 mt-1">{entry.note || "No specific notes."}</div>
                            </div>
                            <div className="text-2xl bg-lavender-50 w-10 h-10 flex items-center justify-center rounded-full border border-lavender-100">
                                {['😭', '😢', '😞', '😔', '😐', '🙂', '😊', '😄', '😁', '🥰'][entry.mood - 1] || '😐'}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-3">
                            <div className="flex flex-col items-center bg-indigo-50 p-2 rounded-lg">
                                <span className="text-xs text-indigo-400 font-semibold mb-1">Sleep</span>
                                <span className="text-sm font-bold text-indigo-600 flex items-center gap-1">
                                    <Moon size={12} /> {entry.sleep}h
                                </span>
                            </div>
                            <div className="flex flex-col items-center bg-red-50 p-2 rounded-lg">
                                <span className="text-xs text-red-400 font-semibold mb-1">Pain</span>
                                <span className="text-sm font-bold text-red-600 flex items-center gap-1">
                                    <Activity size={12} /> {entry.pain}/10
                                </span>
                            </div>
                            <div className="flex flex-col items-center bg-lavender-50 p-2 rounded-lg">
                                <span className="text-xs text-lavender-500 font-semibold mb-1">Mood</span>
                                <span className="text-sm font-bold text-lavender-700">
                                    {entry.mood}/10
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    const renderWeeklyView = () => (
        <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
                    <Activity className="text-lavender-500" size={20} />
                    Mood Trend (Last 7 Days)
                </h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} dy={10} />
                            <YAxis domain={[0, 10]} hide />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Line type="monotone" dataKey="mood" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: '#a855f7', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
                    <Moon className="text-indigo-500" size={20} />
                    Sleep Analysis
                </h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} dy={10} />
                            <YAxis hide />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                            <Bar dataKey="sleep" fill="#818cf8" radius={[6, 6, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );

    const renderMonthlyView = () => {
        // Calendar Generation
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDayOfWeek = firstDay.getDay(); // 0 = Sunday

        const days = [];
        for (let i = 0; i < startDayOfWeek; i++) {
            days.push(null); // Padding
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }

        const changeMonth = (offset) => {
            const newDate = new Date(selectedDate);
            newDate.setMonth(newDate.getMonth() + offset);
            setSelectedDate(newDate);
        };

        return (
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-lavender-100 text-center">
                        <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Avg Mood</span>
                        <div className="text-2xl font-bold text-lavender-600 mt-1">{monthlyStats.avgMood}</div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 text-center">
                        <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Avg Sleep</span>
                        <div className="text-2xl font-bold text-indigo-600 mt-1">{monthlyStats.avgSleep}h</div>
                    </div>
                </div>

                {/* Calendar */}
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                            <ChevronLeft size={20} />
                        </button>
                        <h3 className="text-lg font-bold text-slate-800">
                            {selectedDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                        </h3>
                        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                            <div key={d} className="text-xs font-bold text-slate-300">{d}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {days.map((date, idx) => {
                            if (!date) return <div key={idx} className="aspect-square"></div>;

                            // Find entry for this date
                            const dayEntry = entries.find(e => {
                                const d = new Date(e.date);
                                return d.getDate() === date.getDate() &&
                                    d.getMonth() === date.getMonth() &&
                                    d.getFullYear() === date.getFullYear();
                            });

                            let moodColor = 'bg-slate-50 text-slate-400'; // Default empty
                            let moodEmoji = date.getDate(); // Default just number

                            if (dayEntry) {
                                if (dayEntry.mood >= 8) moodColor = 'bg-green-100 text-green-700 border-green-200';
                                else if (dayEntry.mood >= 5) moodColor = 'bg-lavender-100 text-lavender-700 border-lavender-200';
                                else moodColor = 'bg-orange-100 text-orange-700 border-orange-200';

                                // Optional: Show emoji instead of number if entry exists
                                // moodEmoji = ['😭', '😢', '😞', '😔', '😐', '🙂', '😊', '😄', '😁', '🥰'][dayEntry.mood - 1]; 
                            }

                            return (
                                <div key={idx} className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium border ${moodColor} relative transition-all hover:scale-105 cursor-default`}>
                                    {date.getDate()}
                                    {dayEntry && (
                                        <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-current opacity-50"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-4 flex justify-center gap-4 text-xs text-slate-400">
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400"></div>Good</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-lavender-400"></div>Okay</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-400"></div>Rough</div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex p-1 bg-slate-100 rounded-xl">
                {['daily', 'weekly', 'monthly'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${activeTab === tab
                                ? 'bg-white text-lavender-700 shadow-sm'
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[300px]">
                {activeTab === 'daily' && renderDailyView()}
                {activeTab === 'weekly' && renderWeeklyView()}
                {activeTab === 'monthly' && renderMonthlyView()}
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
