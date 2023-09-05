import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes , Route} from "react-router-dom";

import Login from "./components/Login.component";
import Signup from "./components/Signup.component";
import File from './components/file.component';
import UbaUserPattern from './components/ubaUserPattern'
import Visual from './components/visual.component';
import UBA from './components/ubaDashboard.component';
import UbaEventOverview from './components/ubaEventOverview';
import UbaAnomalyTrend from './components/ubaAnomalyTrend';
import RealTimeDetection from './components/realTimeDashboard';
import MITREDashboard from './components/mitreDashboard';
import ShowAnomalieslist from './components/showAnomalies';
import Practice from './components/practice.component';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/file" element={<File />}></Route>
        <Route path="/vis" element={<Visual />}></Route>
        <Route path="/uba" element={<UBA />}></Route>
        <Route path="/userevents" element={<UbaEventOverview />}></Route>
        <Route path="/useranomalies" element={<UbaAnomalyTrend />}></Route>
        <Route path="/prac" element={<Practice />}></Route>
        <Route path="/userpattern" element={<UbaUserPattern />}></Route>
        <Route path="/realtime" element={<RealTimeDetection />}></Route>
        <Route path="/showanomalies" element={<ShowAnomalieslist />}></Route>
        <Route path="/mitre" element={<MITREDashboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;