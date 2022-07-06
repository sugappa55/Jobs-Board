import React from "react"
import Navbar from  "./Components/Navbar"
import Main from  "./Components/Main"
import {Routes,Route} from "react-router-dom"
import CustomizedSnackbars from "./Components/Alert";
import Jobpage from "./Components/Jobpage";
function App() {
  return (
    <div className="bg-gray-200" >
        <Navbar/>
        <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/jobs/:id" element={<Jobpage/>}/>

        </Routes>
        <CustomizedSnackbars/>
      </div>

  );
}

export default App;
