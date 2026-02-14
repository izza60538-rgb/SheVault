import React, { useState, useEffect } from 'react';
import DailyCheckIn from './components/DailyCheckIn';
import AnalysisView from './components/AnalysisView';
import Login from './components/Login';
import InfoDashboard from './components/InfoDashboard';
import Profile from './components/Profile';
import { getEntries, deleteUserAccount } from './utils/storage';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Heart, LogOut, Home, User } from 'lucide-react';

function App() {
  const [user, setUser] = useState(localStorage.getItem('shevault_user'));
  const [entries, setEntries] = useState([]);
  const [view, setView] = useState('info'); // 'info', 'checkin', 'analysis', 'profile'

  useEffect(() => {
    if (user) {
      setEntries(getEntries(user));
    }
  }, [user]);

  const handleLogin = (username) => {
    localStorage.setItem('shevault_user', username);
    setUser(username);
    setView('info');
  };

  const handleLogout = () => {
    localStorage.removeItem('shevault_user');
    setUser(null);
    setView('info'); // Reset view for next login
  };

  const handleDeleteAccount = () => {
    deleteUserAccount(user);
    handleLogout();
  };

  const handleSave = () => {
    setEntries(getEntries(user));
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Prepare data for chart (reverse chronological for graph)
  const chartData = [...entries].reverse().map(e => ({
    date: new Date(e.date).toLocaleDateString(),
    mood: e.mood
  }));

  return (
    <div className="min-h-screen font-sans text-slate-800">

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 w-full">
        <div className="container mx-auto max-w-3xl px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="text-lavender-500 fill-lavender-500" size={24} />
            <h1 className="text-xl font-bold text-lavender-700">SheVault</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleLogout} className="text-slate-400 hover:text-lavender-600 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
          <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-100 p-4 flex justify-around sm:relative sm:border-none sm:p-0 sm:w-auto sm:bg-transparent sm:gap-8">
            <button
              onClick={() => setView('info')}
              className={`${view === 'info' ? 'text-lavender-600' : 'text-slate-400'}`}
            >
              <span className="sm:hidden"><Home size={24} /></span>
              <span className="hidden sm:inline">Home</span>
            </button>
            <button
              onClick={() => setView('checkin')}
              className={`${view === 'checkin' ? 'text-lavender-600' : 'text-slate-400'}`}
            >
              Check-in
            </button>
            <button
              onClick={() => setView('analysis')}
              className={`${view === 'analysis' ? 'text-lavender-600' : 'text-slate-400'}`}
            >
              Insights
            </button>
            <button
              onClick={() => setView('profile')}
              className={`${view === 'profile' ? 'text-lavender-600' : 'text-slate-400'}`}
            >
              <User size={24} />
              <span className="sr-only">Profile</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-8 space-y-6">

        {view === 'info' && <InfoDashboard onStartTracking={() => setView('checkin')} />}

        {view === 'profile' && (
          <Profile
            username={user}
            onLogout={handleLogout}
            onDeleteAccount={handleDeleteAccount}
          />
        )}

        {view === 'analysis' && (
          <div className="space-y-6">
            <AnalysisView entries={entries} />

            {/* Mood Chart */}
            {entries.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold mb-4 text-slate-700">Mood Trends</h3>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="date" hide />
                      <YAxis hide domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="mood" stroke="#a882b5" strokeWidth={3} dot={{ r: 4, fill: '#a882b5' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100">
              <p className="text-center text-xs text-slate-300 mt-2">SheVault • Safe & Secure</p>
            </div>
          </div>
        )}

        {view === 'checkin' && (
          <DailyCheckIn onSave={handleSave} user={user} />
        )}

        {/* History List (Simple) */}
        {view === 'analysis' && entries.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-700 px-1">Recent Entries</h3>
            {entries.slice(0, 5).map(entry => (
              <div key={entry.id} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">{new Date(entry.date).toLocaleDateString()}</span>
                  <span className="font-medium text-slate-700 truncate block max-w-[200px]">{entry.note || 'No note'}</span>
                </div>
                <div className="flex gap-3 text-xs font-semibold">
                  <span className="bg-lavender-100 text-lavender-700 px-2 py-1 rounded">Mood: {entry.mood}</span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded">Pain: {entry.pain}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
