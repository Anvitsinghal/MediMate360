import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'sonner';

const RelevanceChecker = () => {
  const [medicine, setMedicine] = useState('');
  const [disease, setDisease] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkHandler = async (e) => {
    e.preventDefault();
    
    if (!medicine.trim() || !disease.trim()) {
      toast.error('Please enter both medicine name and disease');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.get('https://medimate360.onrender.com/medicine/relevance', {
        params: {
          name: medicine.trim(),
          disease: disease.trim()
        },
        withCredentials: true,
      });

      if (res.data.success) {
        setResult(res.data.relevance);
        toast.success('Relevance check completed!');
      } else {
        toast.error(res.data.message || 'Failed to check relevance');
      }
    } catch (error) {
      console.error('Relevance check error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to check relevance';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Medicine Relevance Checker</h2>
      
      <form onSubmit={checkHandler} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Medicine Name:
          </label>
          <input 
            type="text" 
            value={medicine} 
            onChange={(e) => setMedicine(e.target.value)}
            placeholder="Enter medicine name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Disease/Condition:
          </label>
          <input 
            type="text" 
            value={disease} 
            onChange={(e) => setDisease(e.target.value)}
            placeholder="Enter disease or condition..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading || !medicine.trim() || !disease.trim()}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Checking...' : 'Check Relevance'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <h3 className="font-semibold mb-2">Relevance Results:</h3>
          <div className="space-y-2">
            {typeof result === 'object' ? (
              <pre className="text-sm bg-white p-3 rounded border overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            ) : (
              <p className="text-sm">{result}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelevanceChecker;
