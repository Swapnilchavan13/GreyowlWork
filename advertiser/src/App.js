import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Account } from './Component/Account';
import { Campaigndetails } from './Component/Campaigndetails';
import { Module2 } from './Component/Module2';
import { Summary } from './Component/Summary';
import { Usersummary } from './Component/Usersummary';
import { Signup } from './Component/Signup';
import { Login } from './Component/Login';
import { Createown } from './Component/Createown';
import { Addcreator } from './Component/Addcreator';
import { Imgandvid } from './Component/Imgandvid';
import { CommonDataComponent } from './Component/CommonDataComponent';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/account" element={<Account />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/addcreator" element={<Addcreator />}></Route>
      <Route path="/createown" element={<Createown />}></Route>
      <Route path="/campaign" element={<Campaigndetails />}></Route>
      <Route path="/media" element={<Module2 />}></Route>
      <Route path="/summary" element={<Summary />}></Route>
      <Route path="/usersummary" element={<Usersummary />}></Route>
      <Route path="/slectedimgandvid" element={<Imgandvid />}></Route>
      <Route path="/hi" element={<CommonDataComponent />}></Route>

      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
