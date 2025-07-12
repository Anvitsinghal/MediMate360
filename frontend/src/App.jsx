import React from 'react'
import { Routes, Route } from "react-router-dom";
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import UploadPrescription from './components/UploadPrescription';
import Medicines from './Medicines';
import RelevanceChecker from './components/RelevanceChecker';
import Reminders from './components/Reminders';
import Schemes from './components/Schemes';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Admin from './components/Admin';
const App = () => {
  return (
    <>
  <Routes>
  <Route
    path="/"
    element={<><MainLayout /></>}
  >
    <Route index element={<Home />} />
    <Route path="upload" element={<><UploadPrescription /></>} />
    <Route path="medicines" element={<><Medicines /></>} />
    <Route path="relevance" element={<><RelevanceChecker /></>} />
    <Route path="reminders" element={<><Reminders /></>} />
    <Route path="schemes" element={<><Schemes /></>} />
    <Route path="profile" element={<><Profile /></>} />
    <Route path="edit" element={<><EditProfile /></>} />
     <Route path="admin" element={<><Admin /></>} />
  </Route>

  
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="*" element={<NotFound />} />
</Routes>

    </>
  )
}

export default App
