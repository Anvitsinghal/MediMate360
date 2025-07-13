import React from 'react';
import { IoMdClose, IoMdPerson, IoMdCalendar, IoMdMedical, IoMdCash, IoMdDocument, IoMdCall, IoMdLink, IoMdCheckmark } from 'react-icons/io';

const SchemeDetail = ({ scheme, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <IoMdClose className="w-6 h-6" />
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{scheme.name}</h2>
          <p className="text-blue-100">{scheme.description}</p>
        </div>

        <div className="p-6">
          {/* Scheme Image */}
          {scheme.eligibility?.schemeimage?.url && (
            <div className="mb-6">
              <img
                src={scheme.eligibility.schemeimage.url}
                alt={scheme.name}
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
            </div>
          )}

          {/* Benefits Section */}
          {scheme.benefits && scheme.benefits.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <IoMdCheckmark className="w-6 h-6 text-green-600" />
                Benefits & Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scheme.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                    <IoMdCheckmark className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Eligibility Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Eligibility Criteria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <IoMdCalendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Age Range</p>
                    <p className="font-semibold text-gray-800">
                      {scheme.eligibility?.ageRange?.min || 0} - {scheme.eligibility?.ageRange?.max || 100} years
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                  <IoMdPerson className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-semibold text-gray-800">
                      {scheme.eligibility?.gender?.join(', ') || 'Any'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <IoMdClose className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Applicable States</p>
                    <p className="font-semibold text-gray-800">
                      {scheme.eligibility?.states?.join(', ') || 'All States'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {scheme.eligibility?.diseasesCovered && scheme.eligibility.diseasesCovered.length > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                    <IoMdMedical className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Diseases Covered</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {scheme.eligibility.diseasesCovered.map((disease, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium"
                          >
                            {disease}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {scheme.eligibility?.incomeLimit && (
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                    <IoMdCash className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-600">Income Limit</p>
                      <p className="font-semibold text-gray-800">
                        ₹{scheme.eligibility.incomeLimit.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {scheme.eligibility?.otherCriteria && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <IoMdDocument className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Other Criteria</p>
                      <p className="font-semibold text-gray-800">
                        {scheme.eligibility.otherCriteria}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Documents Required */}
          {scheme.documentsRequired && scheme.documentsRequired.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <IoMdDocument className="w-6 h-6 text-blue-600" />
                Documents Required
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scheme.documentsRequired.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact & Apply Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scheme.helpline && (
              <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <IoMdCall className="w-5 h-5 text-green-600" />
                  Helpline
                </h4>
                <p className="text-green-700 font-medium">{scheme.helpline}</p>
              </div>
            )}

            {scheme.applyLink && (
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <IoMdLink className="w-5 h-5 text-blue-600" />
                  Apply Online
                </h4>
                <a
                  href={scheme.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Visit Website
                  <IoMdLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Close
            </button>
            {scheme.applyLink && (
              <a
                href={scheme.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <IoMdLink className="w-5 h-5" />
                Apply Now
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetail; 