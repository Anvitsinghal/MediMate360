import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'sonner';

const Updatescheme = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [uid, setUid] = useState('');

  const [schemeName, setSchemeName] = useState("");
  const [schemeDescription, setSchemeDescription] = useState("");
  const [benefits, setBenefits] = useState([]);
  const [eligibility, setEligibility] = useState("");
  const [gender, setGender] = useState("");
  const [states, setStates] = useState([]);
  const [diseasesCovered, setDiseasesCovered] = useState([]);
  const [incomeLimit, setIncomeLimit] = useState("");
  const [otherCriteria, setOtherCriteria] = useState("");
  const [documentsRequired, setDocumentsRequired] = useState([]);
  const [applyLink, setApplyLink] = useState("");
  const [helpline, setHelpline] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [schemeImage, setSchemeImage] = useState(null);

  const deleteHandler = async (e) => {
    e.preventDefault();
    if (!uid) return toast.error("Please enter Scheme ID");

    try {
      const res = await axios.delete(`http://localhost:8000/scheme/delete/${uid}`, {
        withCredentials: true,
      });
      toast[res.data.success ? "success" : "error"](res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete scheme");
    }
  };

  const handleSchemeSubmit = async (e) => {
    e.preventDefault();
    if (!uid) return toast.error("Please enter Scheme ID");

    const formData = new FormData();
    formData.append("name", schemeName);
    formData.append("description", schemeDescription);
    formData.append("eligibility", eligibility);
    formData.append("gender", gender);
    formData.append("incomeLimit", incomeLimit);
    formData.append("otherCriteria", otherCriteria);
    formData.append("applyLink", applyLink);
    formData.append("helpline", helpline);
    formData.append("isActive", isActive);
    if (schemeImage) formData.append("schemeImage", schemeImage);
    formData.append("benefits", JSON.stringify(benefits));
    formData.append("states", JSON.stringify(states));
    formData.append("diseasesCovered", JSON.stringify(diseasesCovered));
    formData.append("documentsRequired", JSON.stringify(documentsRequired));

    try {
      const res = await axios.post(`http://localhost:8000/scheme/update/${uid}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast[res.data.success ? "success" : "error"](res.data.message);

      // Reset all states
      setUid("");
      setSchemeName("");
      setSchemeDescription("");
      setBenefits([]);
      setEligibility("");
      setGender("");
      setStates([]);
      setDiseasesCovered([]);
      setIncomeLimit("");
      setOtherCriteria("");
      setDocumentsRequired([]);
      setApplyLink("");
      setHelpline("");
      setIsActive(true);
      setSchemeImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update scheme");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setIsDeleteMode(false)}
          className={`px-4 py-2 rounded ${!isDeleteMode ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          Update Scheme
        </button>
        <button
          onClick={() => setIsDeleteMode(true)}
          className={`px-4 py-2 rounded ${isDeleteMode ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
        >
          Delete Scheme
        </button>
      </div>

      {isDeleteMode ? (
        <form onSubmit={deleteHandler} className="space-y-4">
          <h2 className="text-xl font-semibold">Delete Scheme</h2>
          <input
            type="text"
            placeholder="Enter Scheme ID"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete
          </button>
        </form>
      ) : (
        <form onSubmit={handleSchemeSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold">Update Scheme</h2>
          <input type="text" placeholder="Scheme ID" value={uid} onChange={(e) => setUid(e.target.value)} required className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Scheme Name" value={schemeName} onChange={(e) => setSchemeName(e.target.value)} className="w-full p-3 border rounded-lg" />
          <textarea placeholder="Description" value={schemeDescription} onChange={(e) => setSchemeDescription(e.target.value)} className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Benefits (comma separated)" onChange={(e) => setBenefits(e.target.value.split(",").map((b) => b.trim()))} className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Eligibility" value={eligibility} onChange={(e) => setEligibility(e.target.value)} className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="States (comma separated)" onChange={(e) => setStates(e.target.value.split(",").map((s) => s.trim()))} className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Diseases Covered (comma separated)" onChange={(e) => setDiseasesCovered(e.target.value.split(",").map((d) => d.trim()))} className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Income Limit" value={incomeLimit} onChange={(e) => setIncomeLimit(e.target.value)} className="w-full p-3 border rounded-lg" />
          <textarea placeholder="Other Criteria" value={otherCriteria} onChange={(e) => setOtherCriteria(e.target.value)} className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Documents Required (comma separated)" onChange={(e) => setDocumentsRequired(e.target.value.split(",").map((doc) => doc.trim()))} className="w-full p-3 border rounded-lg" />
          <input type="url" placeholder="Apply Link" value={applyLink} onChange={(e) => setApplyLink(e.target.value)} className="w-full p-3 border rounded-lg" />
          <input type="tel" placeholder="Helpline" value={helpline} onChange={(e) => setHelpline(e.target.value)} className="w-full p-3 border rounded-lg" />

          <div className="flex items-center gap-2">
            <label htmlFor="schemeImage">Scheme Image:</label>
            <input type="file" id="schemeImage" onChange={(e) => setSchemeImage(e.target.files[0])} />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="isActive">Is Active:</label>
            <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700">Update Scheme</button>
        </form>
      )}
    </div>
  );
};

export default Updatescheme;
