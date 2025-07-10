import { setSchemes } from '@/Redux/schemeSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const Schemes = () => {
  const dispatch = useDispatch();
  const { schemes } = useSelector(store => store.scheme);

  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    state: '',
    age: '',
    disease: '',
    income: ''
  });

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await axios.get("http://localhost:8000/scheme/getallschemes");
        if (res.data.success) {
          dispatch(setSchemes(res.data.schemes));
          setFiltered(res.data.schemes); // initialize filtered list
        }
      } catch (error) {
        toast.message("try again");
        console.log(error);
      }
    };
    fetchSchemes();
  }, [dispatch]);

 
  useEffect(() => {
    let data = [...schemes];

    if (search.trim() !== '') {
      data = data.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.gender) {
      data = data.filter(s => s.eligibility?.gender?.includes(filters.gender));
    }

    if (filters.state) {
      data = data.filter(s => s.eligibility?.states?.includes(filters.state));
    }

    if (filters.age) {
      const age = parseInt(filters.age);
      data = data.filter(s =>
        s.eligibility?.ageRange?.min <= age &&
        s.eligibility?.ageRange?.max >= age
      );
    }

    if (filters.disease) {
      data = data.filter(s =>
        s.eligibility?.diseasesCovered?.includes(filters.disease)
      );
    }

    if (filters.income) {
      data = data.filter(s =>
        s.eligibility?.incomeLimit &&
        s.eligibility.incomeLimit >= parseInt(filters.income)
      );
    }

    setFiltered(data);
  }, [search, filters, schemes]);

  return (
    <div className="p-4 space-y-6">
      
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search schemes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />

        <input
          type="number"
          placeholder="Enter your age"
          value={filters.age}
          onChange={e => setFilters(prev => ({ ...prev, age: e.target.value }))}
          className="border px-3 py-2 rounded-md"
        />

        <input
          type="number"
          placeholder="Max Income Limit"
          value={filters.income}
          onChange={e => setFilters(prev => ({ ...prev, income: e.target.value }))}
          className="border px-3 py-2 rounded-md"
        />

        <select
          value={filters.gender}
          onChange={e => setFilters(prev => ({ ...prev, gender: e.target.value }))}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Enter state"
          value={filters.state}
          onChange={e => setFilters(prev => ({ ...prev, state: e.target.value }))}
          className="border px-3 py-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Disease (optional)"
          value={filters.disease}
          onChange={e => setFilters(prev => ({ ...prev, disease: e.target.value }))}
          className="border px-3 py-2 rounded-md"
        />
      </div>

      
      {filtered.length === 0 ? (
        <p>No schemes match your criteria.</p>
      ) : (
        filtered.map((scheme, idx) => (
          <div key={idx} className="border p-4 rounded-xl shadow-md bg-white space-y-2">
            <h2 className="text-xl font-bold text-blue-700">{scheme.name}</h2>
            <p className="text-gray-700">{scheme.description}</p>

            {scheme.eligibility?.schemeimage?.url && (
              <img
                src={scheme.eligibility.schemeimage.url}
                alt={scheme.name}
                className="w-full max-w-md rounded-md"
              />
            )}

            <div>
              <strong>Benefits:</strong>
              <ul className="list-disc list-inside ml-4">
                {scheme.benefits?.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>

            <div>
              <strong>Eligibility:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Age: {scheme.eligibility?.ageRange?.min} - {scheme.eligibility?.ageRange?.max}</li>
                <li>Gender: {scheme.eligibility?.gender?.join(', ')}</li>
                <li>States: {scheme.eligibility?.states?.join(', ')}</li>
                <li>Diseases: {scheme.eligibility?.diseasesCovered?.join(', ') || 'None'}</li>
                {scheme.eligibility?.incomeLimit && (
                  <li>Income Limit: ₹{scheme.eligibility.incomeLimit}</li>
                )}
                {scheme.eligibility?.otherCriteria && (
                  <li>Other: {scheme.eligibility.otherCriteria}</li>
                )}
              </ul>
            </div>

            <div>
              <strong>Documents Required:</strong>
              <ul className="list-disc list-inside ml-4">
                {scheme.documentsRequired?.map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>
            </div>

            {scheme.applyLink && (
              <p>
                <strong>Apply Link:</strong>{' '}
                <a href={scheme.applyLink} className="text-blue-500 underline" target="_blank" rel="noreferrer">
                  {scheme.applyLink}
                </a>
              </p>
            )}

            {scheme.helpline && (
              <p>
                <strong>Helpline:</strong> {scheme.helpline}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Schemes;
