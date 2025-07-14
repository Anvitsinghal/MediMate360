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
import Updatescheme from './components/Updatescheme';
import ProtectedRoutes from './components/ProtectedRoutes';
const App = () => {
  return (
    <>
  <Routes>
  <Route
    path="/"
    element={<ProtectedRoutes><MainLayout /></ProtectedRoutes>}
  >
    <Route index element={<Home />} />
    <Route path="upload" element={<ProtectedRoutes><UploadPrescription /></ProtectedRoutes>} />
    <Route path="medicines" element={<ProtectedRoutes><Medicines /></ProtectedRoutes>} />
    <Route path="relevance" element={<ProtectedRoutes><RelevanceChecker /></ProtectedRoutes>} />
    <Route path="reminders" element={<ProtectedRoutes><Reminders /></ProtectedRoutes>} />
    <Route path="schemes" element={<ProtectedRoutes><Schemes /></ProtectedRoutes>} />
    <Route path="profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
    <Route path="edit" element={<ProtectedRoutes><EditProfile /></ProtectedRoutes>} />
     <Route path="admin" element={<ProtectedRoutes><Admin /></ProtectedRoutes>} />
     <Route path="update" element={<Updatescheme/>} />
  </Route>

  
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="*" element={<NotFound />} />
</Routes>

    </>
  )
}

export default App
