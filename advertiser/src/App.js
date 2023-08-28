import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Account } from './Component/Account';
import { Customerdetails } from './Component/Customerdetails';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Account />}></Route>
      <Route path="/customer" element={<Customerdetails />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
