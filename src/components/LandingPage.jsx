import React from 'react';
import { Video, Shield, Users, Zap, Stethoscope } from 'lucide-react';

const LandingPage = ({ onPractitionerLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Health Meet
            </span>
          </div>
          <button 
            onClick={onPractitionerLogin}
            className="glass px-6 py-2 rounded-xl hover:bg-white/20 transition-all font-medium"
          >
            Practitioner Login
          </button>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-4 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 inline-block">
              <span className="glass px-4 py-2 rounded-full text-sm font-medium text-blue-300">
                🔒 Enterprise-Grade Security
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-teal-100 bg-clip-text text-transparent">
                Secure Healthcare
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
                Video Consultations
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              HIPAA-compliant video conferencing for healthcare professionals. 
              Connect with patients securely, anywhere, anytime.
            </p>

            {/* Info Box for Patients */}
            <div className="glass-dark p-8 rounded-3xl max-w-2xl mx-auto mb-16">
              <Stethoscope className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-3">For Patients</h3>
              <p className="text-slate-300 mb-4">
                Your healthcare provider will send you a secure link to join your consultation.
                Click the link when it's time for your appointment.
              </p>
              <div className="text-sm text-slate-400">
                No downloads or registration required
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="glass-dark p-6 rounded-2xl hover:scale-105 transition-transform">
                <Shield className="w-10 h-10 text-blue-400 mb-4 mx-auto" />
                <h3 className="font-semibold text-lg mb-2">HIPAA Compliant</h3>
                <p className="text-slate-400 text-sm">End-to-end encryption for patient privacy</p>
              </div>
              
              <div className="glass-dark p-6 rounded-2xl hover:scale-105 transition-transform">
                <Users className="w-10 h-10 text-teal-400 mb-4 mx-auto" />
                <h3 className="font-semibold text-lg mb-2">HD Quality</h3>
                <p className="text-slate-400 text-sm">Crystal clear video and audio</p>
              </div>
              
              <div className="glass-dark p-6 rounded-2xl hover:scale-105 transition-transform">
                <Zap className="w-10 h-10 text-purple-400 mb-4 mx-auto" />
                <h3 className="font-semibold text-lg mb-2">Instant Access</h3>
                <p className="text-slate-400 text-sm">No downloads or installations required</p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center text-slate-400 text-sm">
          <p>© 2024 Health Meet. Built with security and privacy in mind.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;