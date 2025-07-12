import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import "./Admin.css";

const Admin = () => {
  const [addschemebutton, setaddschembutton] = useState(true);

  
  const [schemeImage, setschemeImage] = useState(null);
  const [medicineImage, setmedicineImage] = useState(null);


  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [benefits, setbenefits] = useState([]);
  const [eligibility, seteligibility] = useState("");
  const [gender, setgender] = useState("");
  const [states, setstates] = useState([]);
  const [diseasesCovered, setdiseasesCovered] = useState([]);
  const [incomeLimit, setincomeLimit] = useState("");
  const [otherCriteria, setotherCriteria] = useState("");
  const [documentsRequired, setdocumentsRequired] = useState([]);
  const [applyLink, setapplyLink] = useState("");
  const [helpline, sethelpline] = useState("");
  const [isActive, setisActive] = useState(true);


  const [composition, setcomposition] = useState("");
  const [uses, setuses] = useState("");
  const [dosage, setdosage] = useState("");
  const [sideEffects, setsideEffects] = useState([]);
  const [precautions, setprecautions] = useState([]);
  const [storageInstructions, setstorageInstructions] = useState("");
  const [type, settype] = useState("");
  const [isGeneric, setisGeneric] = useState(false);
  const [isPrescriptionRequired, setisPrescriptionRequired] = useState(false);
  const [diseases, setdiseases] = useState([]);
  const [alternatives, setalternatives] = useState([]);
  const [manufacturers, setmanufacturers] = useState([]);
  const [price, setprice] = useState("");
  const [buyLinks, setbuyLinks] = useState([]);


  const seteventhandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
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
      const res = await axios.post("http://localhost:8000/scheme/create", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast[res.data.success ? "success" : "error"](res.data.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit scheme");
    }
  };


  const setmedicinehandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("composition", composition);
    formData.append("description", description);
    formData.append("uses", uses);
    formData.append("dosage", dosage);
    formData.append("storageInstructions", storageInstructions);
    formData.append("type", type);
    formData.append("isGeneric", isGeneric);
    formData.append("isPrescriptionRequired", isPrescriptionRequired);
    formData.append("price", price);
    if (medicineImage) formData.append("medicineImage", medicineImage);
    formData.append("sideEffects", JSON.stringify(sideEffects));
    formData.append("precautions", JSON.stringify(precautions));
    formData.append("diseases", JSON.stringify(diseases));
    formData.append("alternatives", JSON.stringify(alternatives));
    formData.append("manufacturers", JSON.stringify(manufacturers));
    formData.append("buyLinks", JSON.stringify(buyLinks));

    try {
      const res = await axios.post("http://localhost:8000/medicine/create", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast[res.data.success ? "success" : "error"](res.data.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit medicine");
    }
  };

  return (
    <div className="admin-container">
      <div className="toggle-buttons">
        <button onClick={() => setaddschembutton(true)}>Add Scheme</button>
        <button onClick={() => setaddschembutton(false)}>Add Medicine</button>
      </div>

      {addschemebutton ? (
        <form className="form-box" onSubmit={seteventhandler}>
          <h2>Add Scheme</h2>
          <input placeholder="Name" value={name} onChange={(e) => setname(e.target.value)} />
          <input placeholder="Description" value={description} onChange={(e) => setdescription(e.target.value)} />
          <input placeholder="Benefits (comma separated)" onChange={(e) => setbenefits(e.target.value.split(",").map(b => b.trim()))} />
          <input placeholder="Eligibility" value={eligibility} onChange={(e) => seteligibility(e.target.value)} />
          <input placeholder="Gender" value={gender} onChange={(e) => setgender(e.target.value)} />
          <input placeholder="States (comma separated)" onChange={(e) => setstates(e.target.value.split(",").map(s => s.trim()))} />
          <input placeholder="Diseases Covered (comma separated)" onChange={(e) => setdiseasesCovered(e.target.value.split(",").map(d => d.trim()))} />
          <input placeholder="Income Limit" value={incomeLimit} onChange={(e) => setincomeLimit(e.target.value)} />
          <input placeholder="Other Criteria" value={otherCriteria} onChange={(e) => setotherCriteria(e.target.value)} />
          <input placeholder="Documents Required (comma separated)" onChange={(e) => setdocumentsRequired(e.target.value.split(",").map(doc => doc.trim()))} />
          <input placeholder="Apply Link" value={applyLink} onChange={(e) => setapplyLink(e.target.value)} />
          <input placeholder="Helpline" value={helpline} onChange={(e) => sethelpline(e.target.value)} />
          <input type="file" onChange={(e) => setschemeImage(e.target.files[0])} />
          <label>
            Is Active:
            <input type="checkbox" checked={isActive} onChange={(e) => setisActive(e.target.checked)} />
          </label>
          <button type="submit">Submit Scheme</button>
        </form>
      ) : (
        <form className="form-box" onSubmit={setmedicinehandler}>
          <h2>Add Medicine</h2>
          <input placeholder="Name" value={name} onChange={(e) => setname(e.target.value)} />
          <input placeholder="Composition" value={composition} onChange={(e) => setcomposition(e.target.value)} />
          <input placeholder="Description" value={description} onChange={(e) => setdescription(e.target.value)} />
          <input placeholder="Uses" value={uses} onChange={(e) => setuses(e.target.value)} />
          <input placeholder="Dosage" value={dosage} onChange={(e) => setdosage(e.target.value)} />
          <input placeholder="Side Effects (comma separated)" onChange={(e) => setsideEffects(e.target.value.split(",").map(s => s.trim()))} />
          <input placeholder="Precautions (comma separated)" onChange={(e) => setprecautions(e.target.value.split(",").map(p => p.trim()))} />
          <input placeholder="Storage Instructions" value={storageInstructions} onChange={(e) => setstorageInstructions(e.target.value)} />
          <input placeholder="Type (Tablet/Syrup/etc)" value={type} onChange={(e) => settype(e.target.value)} />
          <input placeholder="Diseases (comma separated)" onChange={(e) => setdiseases(e.target.value.split(",").map(d => d.trim()))} />
          <input placeholder="Alternatives (JSON)" onChange={(e) => setalternatives(e.target.value ? JSON.parse(e.target.value) : [])} />
          <input placeholder="Manufacturers (comma separated)" onChange={(e) => setmanufacturers(e.target.value.split(",").map(m => m.trim()))} />
          <input placeholder="Buy Links (JSON)" onChange={(e) => setbuyLinks(e.target.value ? JSON.parse(e.target.value) : [])} />
          <input placeholder="Price" value={price} onChange={(e) => setprice(e.target.value)} />
          <input type="file" onChange={(e) => setmedicineImage(e.target.files[0])} />
          <label>
            Generic:
            <input type="checkbox" checked={isGeneric} onChange={(e) => setisGeneric(e.target.checked)} />
          </label>
          <label>
            Prescription Required:
            <input type="checkbox" checked={isPrescriptionRequired} onChange={(e) => setisPrescriptionRequired(e.target.checked)} />
          </label>
          <button type="submit">Submit Medicine</button>
        </form>
      )}
    </div>
  );
};

export default Admin;
