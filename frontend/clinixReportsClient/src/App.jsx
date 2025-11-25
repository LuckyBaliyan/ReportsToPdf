import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApiTest from './ApiTest'
import './styles/global.css';

import Layout from "./components/layouts/Layout";

import LandingPage from "./pages/landing/LandingPage";

import AllReports from "./pages/reports/AllReports";
import ReportDetails from "./pages/reports/ReportDetails";
import CreateReport from "./pages/reports/CreateReport";

import ReportFrom from './pages/reports/ReportFrom';

import MyReports from "./pages/reports/MyReports";
import DownloadCenter from "./pages/DownloadCenter";

function App(){
  return(
    <Routes>

        <Route element={<Layout />}>

          <Route path="/" element={<LandingPage />} />

          <Route path="/reports" element={<AllReports />} />
          <Route path="/reports/:id" element={<ReportDetails />} />
          <Route path="/reports/create" element={<CreateReport />} />

          <Route path="/create-report/form" element={<ReportFrom/>} />

          <Route path='/myreports' element={<MyReports/>}></Route>

          <Route path="/download-center" element={<DownloadCenter />} />

        </Route>

      </Routes>
  )
}

export default App
