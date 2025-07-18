import { useState } from 'react';
import axios from 'axios';

const TextToArt = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('general');
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/v1/generate-from-text', {
        prompt,
        style
      }, {
        responseType: 'blob',
        headers: { 'Content-Type': 'application/json' }
      });
      const url = URL.createObjectURL(res.data);
      setResultImage(url);
    } catch (err) {
      alert("Error generating image.");
    }
    setLoading(false);
  };

  return (
    <div className="container my-4">
      <h4>Text to Ghibli Art</h4>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Enter your prompt..." onChange={(e) => setPrompt(e.target.value)} />
      </div>
      <div className="mb-3">
        <select className="form-select" onChange={(e) => setStyle(e.target.value)} value={style}>
          <option value="general">Anime</option>
          <option value="fantasy">Fantasy</option>
          <option value="line-art">Line Art</option>
        </select>
      </div>
      <button className="btn btn-success" onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {resultImage && (
        <div className="mt-4">
          <h5>Result:</h5>
          <img src={resultImage} alt="Generated" className="img-fluid" />
        </div>
      )}
    </div>
  );
};

export default TextToArt;
