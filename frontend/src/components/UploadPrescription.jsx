import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const UploadPrescription = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file first");
      return;
    }
    
    setUploading(true);
    setResult(null);
    
    const formData = new FormData();
    formData.append('prescription', file);

    try {
      console.log('Uploading file:', file.name);
      const res = await axios.post('http://localhost:8000/prescription/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      
      console.log('Response received:', res.data);
      
      if(res.data.success){
        toast.success(res.data.message);
        setResult(res.data); 
      } else {
        toast.error(res.data.message || 'Upload failed');
        setResult(res.data);
      }
     
    } catch (err) {
      console.error('Upload error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Upload failed';
      toast.error(errorMessage);
      setResult({ 
        error: errorMessage,
        details: err.response?.data || err.message 
      });
    }
    setUploading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Prescription</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Prescription Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button 
          type="submit" 
          disabled={uploading || !file}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {uploading ? 'Uploading...' : 'Upload Prescription'}
        </button>
      </form>
      
      {result && (
        <div className="mt-6 p-4 border rounded">
          {result.error ? (
            <div className="text-red-600">
              <h3 className="font-semibold">Error:</h3>
              <p>{result.error}</p>
              {result.details && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm">View Details</summary>
                  <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ) : (
            <div>
              <h3 className="font-semibold text-green-600 mb-2">Upload Successful!</h3>
              <p className="text-sm text-gray-600 mb-3">{result.message}</p>
              
              {result.medicines && result.medicines.length > 0 ? (
                <div>
                  <h4 className="font-medium mb-2">Medicines Detected:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {result.medicines.map((med, idx) => (
                      <li key={idx} className="text-sm">{med.name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No medicines were detected in the prescription.</p>
              )}
              
              {result.extractedText && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium">View Extracted Text</summary>
                  <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-auto max-h-40">
                    {result.extractedText}
                  </pre>
                </details>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadPrescription;
