import { useState } from 'react';
import axios from 'axios';

const PhotoToArt = () => {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!image || !prompt) return;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("prompt", prompt);

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/v1/generate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob'
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
      <h4>Photo to Ghibli Art</h4>
      <div className="mb-3">
        <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Enter your prompt..." onChange={(e) => setPrompt(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={handleGenerate} disabled={loading}>
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

export default PhotoToArt;
