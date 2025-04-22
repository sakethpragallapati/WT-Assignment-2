import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Studentlist from "./components/Studentlist"
import Addstudent from "./components/Addstudent";
import Editstudent from "./components/Editstudent";
import Deletestudent from "./components/Deletestudent";

function App() {
  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/studentlist" element={<Studentlist/>}></Route>
          <Route path="/addstudent" element={<Addstudent/>}></Route>
          <Route path="/editstudent" element={<Editstudent/>}></Route>
          <Route path="/deletestudent" element={<Deletestudent/>}></Route>
        </Routes>
      </Router>
  );
}

export default App;