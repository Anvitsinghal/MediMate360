import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// Removed "./Admin.css"; as we'll use Tailwind CSS for styling

const Admin = () => {
  // State to toggle between Add Scheme and Add Medicine forms
  const [addSchemeButton, setAddSchemeButton] = useState(true);
const navigate=useNavigate();
  // State for image files
  const [schemeImage, setSchemeImage] = useState(null);
  const [medicineImage, setMedicineImage] = useState(null);
  
  // State for Scheme form fields
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

  // State for Medicine form fields
  const [medicineName, setMedicineName] = useState(""); // Renamed to avoid conflict with schemeName
  const [composition, setComposition] = useState("");
  const [medicineDescription, setMedicineDescription] = useState(""); // Renamed to avoid conflict with schemeDescription
  const [uses, setUses] = useState("");
  const [dosage, setDosage] = useState("");
  const [sideEffects, setSideEffects] = useState([]);
  const [precautions, setPrecautions] = useState([]);
  const [storageInstructions, setStorageInstructions] = useState("");
  const [type, setType] = useState("");
  const [isGeneric, setIsGeneric] = useState(false);
  const [isPrescriptionRequired, setIsPrescriptionRequired] = useState(false);
  const [diseases, setDiseases] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [price, setPrice] = useState("");
  const [buyLinks, setBuyLinks] = useState([]);

  // Handler for adding a new scheme
  const handleSchemeSubmit = async (e) => {
    e.preventDefault();
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
      const res = await axios.post("https://medimate360.onrender.com/scheme/create", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast[res.data.success ? "success" : "error"](res.data.message);
      // Clear form fields after successful submission
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
      toast.error("Failed to submit scheme");
    }
  };

  // Handler for adding a new medicine
  const handleMedicineSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", medicineName);
    formData.append("composition", composition);
    formData.append("description", medicineDescription);
    formData.append("uses", uses);
    formData.append("dosage", dosage);
        formData.append("sideEffects", JSON.stringify(sideEffects));
    formData.append("precautions", JSON.stringify(precautions));

    formData.append("storageInstructions", storageInstructions);
    formData.append("type", type);
    formData.append("isGeneric", isGeneric);
    formData.append("isPrescriptionRequired", isPrescriptionRequired);
        formData.append("diseases", JSON.stringify(diseases));
    formData.append("alternatives", JSON.stringify(alternatives));
    formData.append("manufacturers", JSON.stringify(manufacturers));

    formData.append("price", price);
   // if (medicineImage) formData.append("medicineImage", medicineImage);
    formData.append("buyLinks", JSON.stringify(buyLinks));
       console.log(formData);
       
    try {
      const res = await axios.post("https://medimate360.onrender.com//medicine/addmedi", formData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast[res.data.success ? "success" : "error"](res.data.message);
      // Clear form fields after successful submission
      setMedicineName("");
      setComposition("");
      setMedicineDescription("");
      setUses("");
      setDosage("");
      setSideEffects([]);
      setPrecautions([]);
      setStorageInstructions("");
      setType("");
      setIsGeneric(false);
      setIsPrescriptionRequired(false);
      setDiseases([]);
      setAlternatives([]);
      setManufacturers([]);
      setPrice("");
      setBuyLinks([]);
  
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit medicine");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-inter">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
        {/* Toggle Buttons Section */}
        <div className="md:w-1/4 bg-gradient-to-br from-purple-600 to-indigo-700 p-6 flex flex-col justify-center items-center space-y-4 text-white">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Panel</h2>
          <button
            onClick={() => setAddSchemeButton(true)}
            className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ease-in-out ${
              addSchemeButton
                ? "bg-white text-purple-700 shadow-md transform scale-105"
                : "bg-transparent border border-white hover:bg-white hover:text-purple-700"
            }`}
          >
            Add Scheme
          </button>
          <button
            onClick={() => {navigate("/update");}}
            className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ease-in-out ${
              addSchemeButton
                ? "bg-white text-purple-700 shadow-md transform scale-105"
                : "bg-transparent border border-white hover:bg-white hover:text-purple-700"
            }`}
          >
            Update/delete
          </button>
          <button
            onClick={() => setAddSchemeButton(false)}
            className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ease-in-out ${
              !addSchemeButton
                ? "bg-white text-purple-700 shadow-md transform scale-105"
                : "bg-transparent border border-white hover:bg-white hover:text-purple-700"
            }`}
          >
            Add Medicine
          </button>
          
        </div>

        {/* Form Section */}
        <div className="md:w-3/4 p-8 md:p-12 bg-white">
          {addSchemeButton ? (
            <form className="space-y-6" onSubmit={handleSchemeSubmit}>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Scheme</h2>
              {/* Input fields for Scheme */}
              <input
                type="text"
                placeholder="Scheme Name"
                value={schemeName}
                onChange={(e) => setSchemeName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                required
              />
              <textarea
                placeholder="Description"
                value={schemeDescription}
                onChange={(e) => setSchemeDescription(e.target.value)}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                required
              ></textarea>
              <input
                type="text"
                placeholder="Benefits (comma separated)"
                onChange={(e) => setBenefits(e.target.value.split(",").map((b) => b.trim()))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Eligibility"
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="States (comma separated)"
                onChange={(e) => setStates(e.target.value.split(",").map((s) => s.trim()))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Diseases Covered (comma separated)"
                onChange={(e) => setDiseasesCovered(e.target.value.split(",").map((d) => d.trim()))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Income Limit"
                value={incomeLimit}
                onChange={(e) => setIncomeLimit(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <textarea
                placeholder="Other Criteria"
                value={otherCriteria}
                onChange={(e) => setOtherCriteria(e.target.value)}
                rows="2"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              ></textarea>
              <input
                type="text"
                placeholder="Documents Required (comma separated)"
                onChange={(e) => setDocumentsRequired(e.target.value.split(",").map((doc) => doc.trim()))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="url"
                placeholder="Apply Link"
                value={applyLink}
                onChange={(e) => setApplyLink(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="tel"
                placeholder="Helpline"
                value={helpline}
                onChange={(e) => setHelpline(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <div className="flex items-center space-x-3">
                <label htmlFor="schemeImage" className="block text-gray-700 font-medium">Scheme Image:</label>
                <input
                  type="file"
                  id="schemeImage"
                  onChange={(e) => setSchemeImage(e.target.files[0])}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="isActive" className="text-gray-700 font-medium">Is Active:</label>
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-md"
              >
                Submit Scheme
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleMedicineSubmit}>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Medicine</h2>
              {/* Input fields for Medicine */}
              <input
                type="text"
                placeholder="Medicine Name"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                required
              />
              <input
                type="text"
                placeholder="Composition"
                value={composition}
                onChange={(e) => setComposition(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                required
              />
              <textarea
                placeholder="Description"
                value={medicineDescription}
                onChange={(e) => setMedicineDescription(e.target.value)}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                required
              ></textarea>
              <input
                type="text"
                placeholder="Uses"
                value={uses}
                onChange={(e) => setUses(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Side Effects (comma separated)"
                onChange={(e) => setSideEffects(e.target.value.split(",").map((s) => s.trim()))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Precautions (comma separated)"
                onChange={(e) => setPrecautions(e.target.value.split(",").map((p) => p.trim()))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Storage Instructions"
                value={storageInstructions}
                onChange={(e) => setStorageInstructions(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Type (Tablet/Syrup/etc)"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Diseases (comma separated)"
                onChange={(e) => setDiseases(e.target.value.split(",").map((d) => d.trim()))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Alternatives (JSON array of {name, price, link})"
                onChange={(e) => {
                  try {
                    setAlternatives(e.target.value ? JSON.parse(e.target.value) : []);
                  } catch (error) {
                    toast.error("Invalid JSON for Alternatives");
                    console.error("Invalid JSON for Alternatives:", error);
                  }
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Manufacturers (comma separated)"
                onChange={(e) => setManufacturers(e.target.value.split(",").map((m) => m.trim()))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Buy Links (JSON array of {pharmacy, url})"
                onChange={(e) => {
                  try {
                    setBuyLinks(e.target.value ? JSON.parse(e.target.value) : []);
                  } catch (error) {
                    toast.error("Invalid JSON for Buy Links");
                    console.error("Invalid JSON for Buy Links:", error);
                  }
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              
              <div className="flex items-center space-x-2">
                <label htmlFor="isGeneric" className="text-gray-700 font-medium">Generic:</label>
                <input
                  type="checkbox"
                  id="isGeneric"
                  checked={isGeneric}
                  onChange={(e) => setIsGeneric(e.target.checked)}
                  className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="isPrescriptionRequired" className="text-gray-700 font-medium">Prescription Required:</label>
                <input
                  type="checkbox"
                  id="isPrescriptionRequired"
                  checked={isPrescriptionRequired}
                  onChange={(e) => setIsPrescriptionRequired(e.target.checked)}
                  className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-md"
              >
                Submit Medicine
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;