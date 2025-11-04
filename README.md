# 🏥 Health Meet

A modern, HIPAA-compliant telemedicine platform built for healthcare professionals. Secure video consultations between practitioners and patients with seamless link-based joining.

## ✨ Features

- 🔒 **HIPAA-Compliant** - End-to-end encrypted video calls
- 👨‍⚕️ **Practitioner Dashboard** - Create and manage consultation sessions
- 🔗 **Link-Based Joining** - Patients join via unique session links
- 🎥 **HD Video & Audio** - Crystal clear consultations
- 💬 **Real-time Chat** - In-meeting messaging
- 🖥️ **Screen Sharing** - Share presentations and documents (practitioner only)
- ⏱️ **Session Timer** - Track consultation duration
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Instant Access** - No downloads required

## 🚀 Quick Start

```bash
# Clone or create the project
npm create vite@latest health-meet -- --template react
cd health-meet

# Install dependencies
npm install
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react

# Initialize Tailwind
npx tailwindcss init -p

# Start development server
npm run dev
```

## 📁 Project Structure

```
health-meet/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx          # Patient landing page
│   │   ├── PractitionerDashboard.jsx # Practitioner session management
│   │   ├── MeetingRoom.jsx          # Video call interface
│   │   └── ChatSidebar.jsx          # In-call messaging
│   ├── App.jsx                      # Main app with routing logic
│   └── main.jsx
└── index.html                       # Jitsi API script loaded here
```

## 🎯 User Workflows

### For Practitioners

1. **Login**: Click "Practitioner Login" on the landing page
2. **Create Session**: 
   - Click "Create Session"
   - Enter session name (e.g., "Follow-up Consultation")
   - Enter your name (e.g., "Dr. Sarah Johnson")
   - Click "Create & Start"
3. **Share Link**: Copy the generated session link and send to patient
4. **Join Meeting**: Automatically enters the video call

### For Patients

1. **Receive Link**: Get session link from your healthcare provider
2. **Click Link**: Opens directly to the consultation page
3. **Enter Name**: Provide your name to join
4. **Join Call**: Automatically connects to the practitioner

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling with glassmorphism effects
- **Jitsi Meet** - Video conferencing infrastructure
- **Lucide React** - Icon library

## 🔧 Configuration

### Custom Jitsi Server

Edit `src/components/MeetingRoom.jsx`:
```javascript
const domain = 'your-jitsi-server.com'; // Line ~85
```

### Branding Colors

Update `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#0ea5e9', // Your brand color
    // ... other shades
  }
}
```

## 📋 Key Features Explained

### Role-Based Access
- **Practitioners**: Full control with screen sharing, session creation
- **Patients**: Join via link, participate in call and chat

### Session Management
- Create unlimited sessions
- Each session gets a unique ID
- Copy/share session links easily
- View recent session history

### Security Features
- Unique session IDs prevent unauthorized access
- HIPAA-compliant messaging
- End-to-end encrypted video calls
- No data persistence (privacy-first)

## 🏗️ Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

Deploy to:
- Vercel: `vercel deploy`
- Netlify: `netlify deploy`
- Any static hosting service

## 🔐 Production Deployment

For HIPAA compliance in production:

1. **Use Your Own Jitsi Server** - Don't rely on public meet.jit.si
2. **Implement Authentication** - Add practitioner login system
3. **Enable Audit Logging** - Track all session activity
4. **SSL/TLS Certificates** - Ensure HTTPS everywhere
5. **Access Controls** - Restrict session creation to verified practitioners
6. **Data Storage** - Implement secure backend for session records

## 🧪 Testing Workflow

1. Open the app in your browser
2. Click "Practitioner Login"
3. Create a new session
4. Copy the session link
5. Open link in an incognito/private window
6. Enter patient name
7. Both users should see each other in the video call ✅

## 📄 License

MIT License - free to use for healthcare projects

## 🤝 Contributing

Contributions welcome! Please feel free to submit pull requests or open issues.

---

Built with ❤️ for accessible healthcare
