import React from "react";
import "../styles/Home.module.css";

const Keywords = ({ textData }) => {
  return (
    <div>
      {textData.map((el, i) => {
        return (
          <div key={`${i}-${el.timestamp}`}>
            <p>Text Incoming: {el.text}</p>
            <p>Captured Outcome: {el.keywords}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Keywords;
