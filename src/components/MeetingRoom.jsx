import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, VideoOff, Mic, MicOff, Monitor, MonitorOff,
  MessageSquare, Users, PhoneOff, Settings, MoreVertical,
  Copy, Check, X, Clock
} from 'lucide-react';
import ChatSidebar from './ChatSidebar';

const MeetingRoom = ({ roomName, userName, userRole, onLeaveMeeting, onPatientJoin }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPatientNameModal, setShowPatientNameModal] = useState(userRole === 'patient' && !userName);
  const [sessionDuration, setSessionDuration] = useState(0);
  const jitsiContainerRef = useRef(null);
  const jitsiApiRef = useRef(null);
  const timerRef = useRef(null);

  // Session timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSessionDuration(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePatientNameSubmit = (e) => {
    e.preventDefault();
    if (patientNameInput.trim()) {
      onPatientJoin(patientNameInput.trim());
      setShowPatientNameModal(false);
    }
  };

  useEffect(() => {
    // Only initialize Jitsi if patient has entered name
    if (userRole === 'patient' && !userName) return;

    // Initialize Jitsi Meet
    if (window.JitsiMeetExternalAPI && jitsiContainerRef.current) {
      const domain = 'meet.jit.si';
      const options = {
        roomName: roomName,
        width: '100%',
        height: '100%',
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName: userName
        },
        configOverwrite: {
          startWithAudioMuted: isMuted,
          startWithVideoMuted: isVideoOff,
          prejoinPageEnabled: false,
          disableDeepLinking: true,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          MOBILE_APP_PROMO: false,
        },
      };

      jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);

      // Listen to Jitsi events
      jitsiApiRef.current.addEventListener('videoConferenceJoined', () => {
        console.log(`${userRole} joined the conference`);
      });

      jitsiApiRef.current.addEventListener('readyToClose', () => {
        onLeaveMeeting();
      });
    }

    // Cleanup on unmount
    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
      }
    };
  }, [roomName, userName, userRole]);

  // Control handlers
  const toggleMute = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleAudio');
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleVideo');
      setIsVideoOff(!isVideoOff);
    }
  };

  const toggleScreenShare = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleShareScreen');
      setIsScreenSharing(!isScreenSharing);
    }
  };

  const handleLeave = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('hangup');
    }
    onLeaveMeeting();
  };

  const copySessionLink = () => {
    const link = `${window.location.origin}?session=${roomName}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Patient Name Modal
  if (showPatientNameModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="glass-dark rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Join Consultation</h2>
            <p className="text-slate-400">Please enter your name to join the session</p>
          </div>

          <form onSubmit={handlePatientNameSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={patientNameInput}
                onChange={(e) => setPatientNameInput(e.target.value)}
                placeholder="John Smith"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-all"
            >
              Join Now
            </button>

            <p className="text-xs text-slate-400 text-center">
              Your consultation is encrypted and HIPAA compliant
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-900 flex flex-col relative">
      {/* Top Bar */}
      <div className="glass-dark px-6 py-4 flex items-center justify-between border-b border-slate-700/50 z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold">Health Meet</span>
          </div>
          <div className="hidden md:block h-6 w-px bg-slate-700"></div>
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-mono">{formatDuration(sessionDuration)}</span>
            </div>
            {userRole === 'practitioner' && (
              <button 
                onClick={copySessionLink}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                title="Copy patient link"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-400">Copy Link</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-blue-500/20 rounded-lg">
            <span className="text-sm font-medium text-blue-400">
              {userRole === 'practitioner' ? '👨‍⚕️ Practitioner' : '👤 Patient'}
            </span>
          </div>
          <button className="p-2 hover:bg-slate-700 rounded-xl transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Jitsi Container */}
        <div className="flex-1 relative bg-slate-950">
          <div ref={jitsiContainerRef} className="absolute inset-0" />
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <ChatSidebar onClose={() => setShowChat(false)} userName={userName} />
        )}

        {/* Participants Sidebar */}
        {showParticipants && (
          <div className="w-80 glass-dark border-l border-slate-700/50 p-4 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="w-5 h-5" />
                Participants (1)
              </h3>
              <button 
                onClick={() => setShowParticipants(false)}
                className="p-1 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{userName}</p>
                  <p className="text-xs text-slate-400">
                    {userRole === 'practitioner' ? 'Practitioner' : 'Patient'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Control Bar */}
      <div className="glass-dark px-6 py-4 border-t border-slate-700/50 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className={`p-4 rounded-xl transition-all ${
                isMuted 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={toggleVideo}
              className={`p-4 rounded-xl transition-all ${
                isVideoOff 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              title={isVideoOff ? 'Start Video' : 'Stop Video'}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>
          </div>

          {/* Center Controls */}
          <div className="flex items-center gap-2">
            {userRole === 'practitioner' && (
              <button
                onClick={toggleScreenShare}
                className={`p-4 rounded-xl transition-all ${
                  isScreenSharing 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
                title="Share Screen"
              >
                {isScreenSharing ? <MonitorOff className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
              </button>
            )}

            <button
              onClick={() => setShowChat(!showChat)}
              className={`p-4 rounded-xl transition-all ${
                showChat 
                  ? 'bg-blue-500' 
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              title="Chat"
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            <button
              onClick={() => setShowParticipants(!showParticipants)}
              className={`p-4 rounded-xl transition-all ${
                showParticipants 
                  ? 'bg-blue-500' 
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              title="Participants"
            >
              <Users className="w-5 h-5" />
            </button>

            <button
              className="p-4 rounded-xl bg-slate-700 hover:bg-slate-600 transition-all"
              title="More Options"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Right Controls */}
          <div>
            <button
              onClick={handleLeave}
              className="px-6 py-4 bg-red-500 hover:bg-red-600 rounded-xl font-semibold transition-all flex items-center gap-2"
              title="Leave Meeting"
            >
              <PhoneOff className="w-5 h-5" />
              <span className="hidden sm:inline">Leave</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;