import { Route, Routes, useNavigate } from "react-router-dom";
import SubjectItems from "./Components/SelectionPage/SubjectItems";
import SubjectDisplay from "./Components/SelectionPage/SubjectDisplay";
import Login from "./Components/Login/Login";
import ICAE from './Components/SubjectDetailsPage/ICAMarksTable'
import FinalFirstMarking from './Components/SubjectDetailsPage/FirstFinalMarking'
import FinalSecondMarking from './Components/SubjectDetailsPage/SecondFinalMarkng'
import CompositeSheetTable from './Components/SubjectDetailsPage/CompositeSheetTable'
import {  useState } from "react";
import UserContext from "./UserContext";

function App() {
  const [userRole, setRole] = useState('');
  const [lecturerName, setLecturerName] = useState('');
  const navigate = useNavigate();

  return (
    <UserContext.Provider value={[userRole, setRole,lecturerName,setLecturerName]}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={userRole === "lecturer" || userRole === "admin" ? <SubjectItems /> : (navigate('/'))}
        />
        <Route
          path="/subject"
          element={userRole === "lecturer" || userRole === "admin" ? <SubjectDisplay /> : (navigate('/'))}
        />
         <Route
        path="/ICAE"
        element={userRole === "lecturer" || userRole === "admin" ? <ICAE /> :(navigate('/'))}
      />
      <Route
        path="Final First Marking"
        element={userRole === "lecturer" || userRole === "admin" ? <FinalFirstMarking /> : (navigate('/'))}
      />
      <Route
        path="/Final Second Marking"
        element={userRole === "lecturer" || userRole === "admin" ? <FinalSecondMarking /> : (navigate('/'))}
      /><Route
      path="/Composite Sheet"
      element={userRole === "lecturer" || userRole === "admin" ? <CompositeSheetTable /> : (navigate('/'))}
    />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
