import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReminders, addReminder, deleteReminder } from '../Redux/reminderSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { IoMdAdd, IoMdTime, IoMdCalendar, IoMdMail, IoMdNotifications, IoMdTrash, IoMdCreate, IoMdClose } from 'react-icons/io';

const Reminders = () => {
  const dispatch = useDispatch();
  const { reminders } = useSelector(state => state.reminder);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    medicineName: '',
    dosage: '',
    time: '',
    days: [],
    startDate: '',
    endDate: '',
    method: 'email',
    message: 'Time to take your medicine'
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Fetch reminders on component mount
  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://medimate360.onrender.com/reminder/getuserreminder', {
        withCredentials: true
      });
      
      if (res.data.success) {
        dispatch(setReminders(res.data.reminders));
      }
    } catch (error) {
      console.error('Fetch reminders error:', error);
      toast.error('Failed to fetch reminders');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'days') {
      // Handle checkbox for days
      setFormData(prev => ({
        ...prev,
        days: checked 
          ? [...prev.days, value]
          : prev.days.filter(day => day !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      medicineName: '',
      dosage: '',
      time: '',
      days: [],
      startDate: '',
      endDate: '',
      method: 'email',
      message: 'Time to take your medicine'
    });
    setEditingReminder(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.time || formData.days.length === 0 || !formData.startDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      if (editingReminder) {
        // Update existing reminder
        const res = await axios.post(`https://medimate360.onrender.com/reminder/updatereminder/${editingReminder._id}`, formData, {
          withCredentials: true
        });
        
        if (res.data.success) {
          toast.success('Reminder updated successfully');
          fetchReminders(); // Refresh the list
        }
      } else {
        // Create new reminder
        const res = await axios.post('https://medimate360.onrender.com/reminder/create', formData, {
          withCredentials: true
        });
        
        if (res.data.success) {
          dispatch(addReminder(res.data.reminder));
          toast.success('Reminder created successfully');
        }
      }
      
      resetForm();
    } catch (error) {
      console.error('Reminder operation error:', error);
      const errorMessage = error.response?.data?.message || 'Operation failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (reminder) => {
    setEditingReminder(reminder);
    setFormData({
      medicineName: reminder.medicineName || '',
      dosage: reminder.dosage || '',
      time: reminder.time,
      days: reminder.days,
      startDate: reminder.startDate.split('T')[0],
      endDate: reminder.endDate ? reminder.endDate.split('T')[0] : '',
      method: reminder.method,
      message: reminder.message
    });
    setShowForm(true);
  };

  const handleDelete = async (reminderId) => {
    if (!window.confirm('Are you sure you want to delete this reminder?')) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`https://medimate360.onrender.com/reminder/deletereminder/${reminderId}`, {}, {
        withCredentials: true
      });
      
      if (res.data.success) {
        dispatch(deleteReminder(reminderId));
        toast.success('Reminder deleted successfully');
      }
    } catch (error) {
      console.error('Delete reminder error:', error);
      toast.error('Failed to delete reminder');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getMethodIcon = (method) => {
    return method === 'email' ? <IoMdMail className="w-4 h-4" /> : <IoMdNotifications className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Medicine Reminders
            </h1>
            <p className="text-gray-600 mt-2">Stay on track with your medication schedule</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-medium"
          >
            <IoMdAdd className="w-5 h-5" />
            {showForm ? 'Cancel' : 'Add Reminder'}
          </button>
        </div>

        {/* Reminder Form */}
        {showForm && (
          <div className="mb-8 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  {editingReminder ? 'Edit Reminder' : 'Create New Reminder'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <IoMdClose className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Medicine Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Medicine Name</label>
                    <input
                      type="text"
                      name="medicineName"
                      value={formData.medicineName}
                      onChange={handleInputChange}
                      placeholder="e.g., Paracetamol, Aspirin"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Dosage</label>
                    <input
                      type="text"
                      name="dosage"
                      value={formData.dosage}
                      onChange={handleInputChange}
                      placeholder="e.g., 1 tablet, 500mg"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Time and Method */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Time *</label>
                    <div className="relative">
                      <IoMdTime className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Notification Method</label>
                    <select
                      name="method"
                      value={formData.method}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="email">Email</option>
                      <option value="notification">Push Notification</option>
                    </select>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Start Date *</label>
                    <div className="relative">
                      <IoMdCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">End Date (Optional)</label>
                    <div className="relative">
                      <IoMdCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Days of Week */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">Days of Week *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                    {daysOfWeek.map(day => (
                      <label key={day} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          name="days"
                          value={day}
                          checked={formData.days.includes(day)}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">{day.slice(0, 3)}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Custom Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Custom reminder message"
                  />
                </div>
                
                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <IoMdCreate className="w-5 h-5" />
                        {editingReminder ? 'Update Reminder' : 'Create Reminder'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reminders List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Your Reminders</h3>
            <div className="text-sm text-gray-500">
              {reminders.length} reminder{reminders.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          {loading && !showForm ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">Loading reminders...</span>
            </div>
          ) : reminders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <IoMdTime className="w-12 h-12 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">No reminders yet</h4>
              <p className="text-gray-500 mb-6">Create your first reminder to stay on track with your medication</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-medium"
              >
                Create Your First Reminder
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reminders.map((reminder) => (
                <div key={reminder._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <IoMdTime className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-gray-800">
                            {reminder.medicineName || 'Medicine Reminder'}
                          </h4>
                          {reminder.dosage && (
                            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                              {reminder.dosage}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <IoMdTime className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">{reminder.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IoMdCalendar className="w-4 h-4 text-green-500" />
                          <span>{reminder.days.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getMethodIcon(reminder.method)}
                          <span className="capitalize">{reminder.method}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-500">
                        <span>From: {formatDate(reminder.startDate)}</span>
                        {reminder.endDate && (
                          <span> • To: {formatDate(reminder.endDate)}</span>
                        )}
                      </div>
                      
                      {reminder.message && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800 italic">"{reminder.message}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(reminder)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <IoMdCreate className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(reminder._id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      <IoMdTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Reminders;
