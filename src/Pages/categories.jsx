import React, { useEffect } from "react";
import "../Styles/categories.css";

const Categories = () => {
  useEffect(() => {
    document.title = "Gambling Maths | Categories";
  }, []);

  return (
    <div className="categories-wrapper">
      <div class="heading">
        <div class="title">GAMBLING MATHS</div>
        <div class="stash">
          <div class="stashTitle">Betting Stash</div>
          <div class="stashAmount">10,00,000</div>
        </div>
      </div>

      <div class="content">
        <form class="categories">
          <div class="category">
            <span id="1" class="check"></span> Category 01
          </div>
          <div class="category">
            <span id="2" class="check"></span> Category 02
          </div>
          <div class="category">
            <span id="3" class="check"></span> Category 03
          </div>
          <div class="category">
            <span id="4" class="check"></span> Category 04
          </div>
          <div class="category">
            <span id="5" class="check"></span> Category 05
          </div>
          <div class="category">
            <span id="6" class="check"></span> Category 06
          </div>
          <div class="category">
            <span id="7" class="check"></span> Category 07
          </div>
          <div class="category">
            <span id="8" class="check"></span> Category 08
          </div>
          <div class="category">
            <span id="9" class="check"></span> Category 09
          </div>
          <div class="category">
            <span id="10" class="check"></span> Category 10
          </div>
          <div class="promptButton" id="btn1">
            SELECT
          </div>
        </form>

        <div class="prompt">
          <div class="promptText">Choose the difficulty of the questions</div>
          <div class="promptButton" id="btn2">
            SELECT
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
