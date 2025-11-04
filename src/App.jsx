import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import PractitionerDashboard from './components/PractitionerDashboard';
import MeetingRoom from './components/MeetingRoom';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [userRole, setUserRole] = useState(null);
  const [meetingData, setMeetingData] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session');
    
    if (sessionId) {
      setUserRole('patient');
      setMeetingData({ 
        roomName: sessionId, 
        userName: '', 
        role: 'patient' 
      });
      setCurrentView('meeting');
    }
  }, []);

  const handlePractitionerLogin = () => {
    setUserRole('practitioner');
    setCurrentView('practitioner');
  };

  const handleCreateSession = (sessionData) => {
    setMeetingData({ 
      ...sessionData, 
      role: 'practitioner' 
    });
    setCurrentView('meeting');
  };

  const handlePatientJoin = (userName) => {
    setMeetingData({ 
      ...meetingData, 
      userName,
      role: 'patient'
    });
    setCurrentView('meeting');
  };

  const handleLeaveMeeting = () => {
    setMeetingData(null);
    if (userRole === 'practitioner') {
      setCurrentView('practitioner');
    } else {
      setCurrentView('landing');
      window.history.pushState({}, '', window.location.pathname);
    }
  };

  return (
    <div className="min-h-screen">
      {currentView === 'landing' && (
        <LandingPage onPractitionerLogin={handlePractitionerLogin} />
      )}
      
      {currentView === 'practitioner' && (
        <PractitionerDashboard onCreateSession={handleCreateSession} />
      )}
      
      {currentView === 'meeting' && (
        <MeetingRoom 
          roomName={meetingData.roomName}
          userName={meetingData.userName}
          userRole={meetingData.role}
          onLeaveMeeting={handleLeaveMeeting}
          onPatientJoin={handlePatientJoin}
        />
      )}
    </div>
  );
}

export default App;