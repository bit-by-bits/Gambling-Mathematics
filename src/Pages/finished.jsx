import React, { useContext, useEffect } from "react";
import axios from "axios";
import baseURL from "../baseURL";
import "../Styles/login.css";
import GlobalContext from "../globalContext";

const Finsihed = () => {
  const { user, setUser } = useContext(GlobalContext);

  useEffect(() => {
    document.title = "Gambling Maths | Game Finished";
  }, []);

  return (
    <div id="login-wrapper">
      <div id="left">
        <div id="login-head">GAMBLING MATHS</div>
        <div className="reg-par">
          Your game has ended. We hope you enjoyed it!
        </div>
      </div>

      <div id="right">
        <div id="login-form">
          <div className="login-field-cont">
            <div className="login-field">
              Your final score is: {user.score ?? "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finsihed;
