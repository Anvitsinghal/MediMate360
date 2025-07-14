import { setSchemes } from '../Redux/schemeSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import SchemeDetail from './SchemeDetail';

const Schemes = () => {
  const dispatch = useDispatch();
  const { schemes } = useSelector(store => store.scheme);
  const { user } = useSelector(store => store.auth);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    gender: '',
    state: '',
    age: '',
    disease: '',
    income: ''
  });

  useEffect(() => {
    const fetchSchemes = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://medimate360.onrender.com/scheme/getallschemes");
        if (res.data.success) {
          dispatch(setSchemes(res.data.schemes));
          setFiltered(res.data.schemes);
          console.log(res);
          
        }
      } catch (error) {
        toast.error("Failed to fetch schemes");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, [dispatch]);

  const showMatchedSchemes = () => {
    setFilters({
      gender: user?.gender || '',
      state: user?.state || '',
      age: user?.age || '',
      disease: '',
      income: ''
    });
    toast.success("Filters applied based on your profile!");
  };

  const clearFilters = () => {
    setFilters({
      gender: '',
      state: '',
      age: '',
      disease: '',
      income: ''
    });
    setSearch('');
    toast.success("Filters cleared!");
  };

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
      const lowerCaseFilterState = filters.state.toLowerCase();
      data = data.filter(s =>
        s.eligibility?.states?.some(state =>
          state.toLowerCase().includes(lowerCaseFilterState)
        )
      );
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
        s.eligibility?.diseasesCovered?.some(disease =>
          disease.toLowerCase().includes(filters.disease.toLowerCase())
        )
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

  const handleSchemeClick = async (schemeId) => {
    try {
      const res = await axios.get(`https://medimate360.onrender.com/scheme/${schemeId}`);
      if (res.data.success) {
        setSelectedScheme(res.data.scheme);
        setShowDetail(true);
      }
    } catch (error) {
      toast.error("Failed to fetch scheme details");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Government Health Schemes
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover and explore government health schemes tailored for you. Find the perfect scheme that matches your profile and requirements.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              {/* Search Icon (replaces IoMdSearch) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search schemes by name or description..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={showMatchedSchemes}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                {/* Close Icon (replaces IoMdClose) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Match My Profile
              </button>
              <button
                onClick={clearFilters}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              {/* Person Icon (replaces IoMdPerson) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <select
                value={filters.gender}
                onChange={e => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="any">Other</option>
              </select>
            </div>

            <div className="relative">
              {/* Location/Map Pin Icon (replaces IoMdClose - assuming this was a typo for location) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243m10.606-10.607a4 4 0 11-5.656 0 4 4 0 015.656 0z" />
              </svg>
              <input
                type="text"
                placeholder="State"
                value={filters.state}
                onChange={e => setFilters(prev => ({ ...prev, state: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              {/* Calendar Icon (replaces IoMdCalendar) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                type="number"
                placeholder="Age"
                value={filters.age}
                onChange={e => setFilters(prev => ({ ...prev, age: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              {/* Medical Cross Icon (replaces IoMdMedical) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <input
                type="text"
                placeholder="Disease"
                value={filters.disease}
                onChange={e => setFilters(prev => ({ ...prev, disease: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              {/* Cash/Money Icon (replaces IoMdCash) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0v1.721a3 3 0 01-.58 1.83l-1.574 2.248A3 3 0 014.25 16H3a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1.25a3 3 0 01-2.67-1.401l-1.574-2.248A3 3 0 019 9.72V8z" />
              </svg>
              <input
                type="number"
                placeholder="Max Income"
                value={filters.income}
                onChange={e => setFilters(prev => ({ ...prev, income: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {filtered.length} scheme{filtered.length !== 1 ? 's' : ''} found
          </h2>
          {filtered.length > 0 && (
            <p className="text-sm text-gray-600">
              Click on any scheme to view full details
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading schemes...</span>
          </div>
        )}

        {/* Schemes Grid */}
        {!loading && (
          <>
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  {/* Sad Face / No results Icon (replaces placeholder) */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No schemes found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((scheme, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSchemeClick(scheme._id)}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                  >
                    {/* Scheme Image */}
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 relative overflow-hidden">
                      {scheme?.schemeImage?.url ? (
                        <img
                          src={scheme.schemeImage.url}
                          alt={scheme.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {/* Generic Health Icon (replaces placeholder) */}
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    {/* Scheme Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                        {scheme.name}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {scheme.description}
                      </p>

                      {/* Benefits Preview */}
                      {scheme.benefits && scheme.benefits.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Benefits:</h4>
                          <div className="space-y-1">
                            {scheme.benefits.slice(0, 2).map((benefit, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                <span className="line-clamp-1">{benefit}</span>
                              </div>
                            ))}
                            {scheme.benefits.length > 2 && (
                              <p className="text-xs text-blue-600 font-medium">
                                +{scheme.benefits.length - 2} more benefits
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* View Details Button */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500">
                          Click to view details
                        </span>
                        {/* Eye Icon (replaces IoMdEye) */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Scheme Detail Modal */}
      {showDetail && selectedScheme && (
        <SchemeDetail
          scheme={selectedScheme}
          onClose={() => {
            setShowDetail(false);
            setSelectedScheme(null);
          }}
        />
      )}
    </div>
  );
};

export default Schemes;