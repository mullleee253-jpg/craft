import React, { useState } from 'react';
import Landing from './components/Landing';
import Editor from './components/Editor';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  return (
    <div className="min-h-screen bg-gray-950">
      {currentView === 'landing' ? (
        <Landing onOpenEditor={() => setCurrentView('editor')} />
      ) : (
        <Editor onBack={() => setCurrentView('landing')} />
      )}
    </div>
  );
}

export default App;
