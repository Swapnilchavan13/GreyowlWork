import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Addcreator = () => {
  const location = useLocation();
  const campiddata = location.state;

  const navigate = useNavigate();

  console.log(campiddata.register_camp_id);

  const campid = { me_id: campiddata.register_camp_id };

  const handleme = () => {
    navigate("/campaign", { state: campid });
  };

  const handleown = () => {
    navigate("/createown");
  };

  return (
    <div className="App">
      <h1>Add Creator (select any one)</h1>
      <ul>
        <li>
          <h2 onClick={handleown}>Create Your Own</h2>
        </li>
        <li>
          <h2 onClick={handleme}>Create For Me</h2>
        </li>
      </ul>
    </div>
  );
};
