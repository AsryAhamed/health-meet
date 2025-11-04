import React, { useState } from 'react';
import { Video, Plus, Clock, Calendar, Copy, Check, X, User } from 'lucide-react';

const PractitionerDashboard = ({ onCreateSession }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const [practitionerName, setPractitionerName] = useState('');
  const [sessions, setSessions] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const generateSessionId = () => {
    return `session-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  };

  const handleCreateSession = (e) => {
    e.preventDefault();
    
    const newSession = {
      id: generateSessionId(),
      sessionName: sessionName,
      practitionerName: practitionerName,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    setSessions([newSession, ...sessions]);
    
    // Start the session immediately
    onCreateSession({
      roomName: newSession.id,
      userName: practitionerName,
      sessionName: sessionName
    });
    
    setShowCreateModal(false);
    setSessionName('');
    setPractitionerName('');
  };

  const copySessionLink = (sessionId) => {
    const link = `${window.location.origin}?session=${sessionId}`;
    navigator.clipboard.writeText(link);
    setCopiedId(sessionId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleJoinSession = (session) => {
    onCreateSession({
      roomName: session.id,
      userName: session.practitionerName,
      sessionName: session.sessionName
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="glass-dark border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Health Meet</h1>
              <p className="text-xs text-slate-400">Practitioner Dashboard</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30"
          >
            <Plus className="w-5 h-5" />
            Create Session
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="glass-dark rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome, Doctor</h2>
          <p className="text-slate-300">
            Create a new consultation session and share the link with your patient.
          </p>
        </div>

        {/* Sessions List */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-400" />
            Recent Sessions
          </h3>

          {sessions.length === 0 ? (
            <div className="glass-dark rounded-2xl p-12 text-center">
              <Video className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No sessions yet</p>
              <p className="text-slate-500 text-sm mt-2">Create your first consultation session</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {sessions.map((session) => (
                <div key={session.id} className="glass-dark rounded-2xl p-6 hover:bg-slate-800/60 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2">{session.sessionName}</h4>
                      <div className="space-y-1 text-sm text-slate-400">
                        <p>Practitioner: {session.practitionerName}</p>
                        <p className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {new Date(session.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => copySessionLink(session.id)}
                        className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all"
                        title="Copy patient link"
                      >
                        {copiedId === session.id ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleJoinSession(session)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 rounded-xl font-semibold transition-all"
                      >
                        Join Session
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Session Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-dark rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Create Consultation Session
              </h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSession} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Session Name
                </label>
                <input
                  type="text"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  placeholder="Follow-up Consultation"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Name (Practitioner)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={practitionerName}
                    onChange={(e) => setPractitionerName(e.target.value)}
                    placeholder="Dr. Sarah Johnson"
                    className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <p className="text-sm text-blue-300">
                  💡 A unique session link will be generated. Share it with your patient to join the consultation.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-all"
                >
                  Create & Start
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PractitionerDashboard;