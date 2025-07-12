import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReminders, addReminder, deleteReminder } from '../Redux/reminderSlice';
import axios from 'axios';
import { toast } from 'sonner';

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
      const res = await axios.get('http://localhost:8000/reminder/getuserreminder', {
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
        const res = await axios.post(`http://localhost:8000/reminder/updatereminder/${editingReminder._id}`, formData, {
          withCredentials: true
        });
        
        if (res.data.success) {
          toast.success('Reminder updated successfully');
          fetchReminders(); // Refresh the list
        }
      } else {
        // Create new reminder
        const res = await axios.post('http://localhost:8000/reminder/create', formData, {
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
      const res = await axios.post(`http://localhost:8000/reminder/deletereminder/${reminderId}`, {}, {
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Medicine Reminders</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add New Reminder'}
        </button>
      </div>

      {/* Reminder Form */}
      {showForm && (
        <div className="mb-6 p-4 border rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">
            {editingReminder ? 'Edit Reminder' : 'Create New Reminder'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Medicine Name</label>
                <input
                  type="text"
                  name="medicineName"
                  value={formData.medicineName}
                  onChange={handleInputChange}
                  placeholder="Enter medicine name"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Dosage</label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  placeholder="e.g., 1 tablet"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Time *</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Method</label>
                <select
                  name="method"
                  value={formData.method}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="email">Email</option>
                  <option value="notification">Notification</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">End Date (Optional)</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Days of Week *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {daysOfWeek.map(day => (
                  <label key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="days"
                      value={day}
                      checked={formData.days.includes(day)}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    <span className="text-sm">{day}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Custom reminder message"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
              >
                {loading ? 'Saving...' : (editingReminder ? 'Update Reminder' : 'Create Reminder')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reminders List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Your Reminders</h3>
        
        {loading && !showForm ? (
          <div className="text-center py-8">Loading reminders...</div>
        ) : reminders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No reminders found. Create your first reminder!
          </div>
        ) : (
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div key={reminder._id} className="border rounded-md p-4 bg-white shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold">
                        {reminder.medicineName || 'Medicine Reminder'}
                      </h4>
                      {reminder.dosage && (
                        <span className="text-sm text-gray-600">({reminder.dosage})</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div>⏰ Time: {reminder.time}</div>
                      <div>📅 Days: {reminder.days.join(', ')}</div>
                      <div>📧 Method: {reminder.method}</div>
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-500">
                      <span>From: {formatDate(reminder.startDate)}</span>
                      {reminder.endDate && (
                        <span> • To: {formatDate(reminder.endDate)}</span>
                      )}
                    </div>
                    
                    {reminder.message && (
                      <div className="mt-2 text-sm italic text-gray-600">
                        "{reminder.message}"
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(reminder)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(reminder._id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reminders;
