import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Account } from './Component/Account';
import { Campaigndetails } from './Component/Campaigndetails';
import { Module2 } from './Component/Module2';
import { Summary } from './Component/Summary';
import { Usersummary } from './Component/Usersummary';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Account />}></Route>
      <Route path="/campaign" element={<Campaigndetails />}></Route>
      <Route path="/module2" element={<Module2 />}></Route>
      <Route path="/summary" element={<Summary />}></Route>
      <Route path="/usersummary" element={<Usersummary />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
