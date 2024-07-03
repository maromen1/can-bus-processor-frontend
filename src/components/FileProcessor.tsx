import React, { useState } from 'react';
import axios from 'axios';

const FileProcessor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleProcess = async () => {
    if (file) {
      setProcessing(true);
      setError(null);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:5121/canbus/process', formData, {
          responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'transferdata.bin';
        link.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error processing file:', error);
        setError('An error occurred while processing the file. Please try again.');
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <div className="file-processor">
      <input type="file" onChange={handleFileChange} accept=".candata" />
      <button onClick={handleProcess} disabled={!file || processing}>
        {processing ? 'Processing...' : 'Process and Download'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FileProcessor;