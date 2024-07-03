import React from 'react';
import FileProcessor from './components/FileProcessor';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CAN Bus Log Processor</h1>
        <FileProcessor />
      </header>
    </div>
  );
};

export default App;