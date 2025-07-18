import PhotoToArt from './components/PhotoToArt';
import TextToArt from './components/TextToArt';
import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('photo');

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Ghibli Art Generator</h2>
      <div className="btn-group mb-4">
        <button className={`btn btn-outline-primary ${activeTab === 'photo' && 'active'}`} onClick={() => setActiveTab('photo')}>Photo to Art</button>
        <button className={`btn btn-outline-success ${activeTab === 'text' && 'active'}`} onClick={() => setActiveTab('text')}>Text to Art</button>
      </div>

      {activeTab === 'photo' ? <PhotoToArt /> : <TextToArt />}
    </div>
  );
}

export default App;
