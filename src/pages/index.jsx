import React, { useRef, useState, useEffect } from "react";

import { retext } from "retext";
import retextPos from "retext-pos";
import retextKeywords from "retext-keywords";
import { toString } from "nlcst-to-string";
import Keywords from "../components/Keywords";
import "../styles/Home.module.css";

const Home = () => {
  const inputRef = useRef();

  const [textData, setTextData] = useState([]);

  useEffect(() => {
    if (textData.length !== 0) {
      localStorage.setItem("my_Data", JSON.stringify(textData));
    }
  }, [textData]);

  useEffect(() => {
    const retrievedData = JSON.parse(localStorage.getItem("my_Data"));
    setTextData(retrievedData);
  }, []);

  const textCatcher = async (text) => {
    let keywords = [];
    let v1 = await retext().use(retextPos).use(retextKeywords).process(text);

    v1.data.keywords.forEach((keyword) => {
      keywords.push(toString(keyword.matches[0].node));
    });
    return keywords;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredText = inputRef.current.value;
    const capturedText = await textCatcher(enteredText);
    const myObj = {
      text: enteredText,
      keywords: capturedText,
      timestamp: Date.now(),
    };

    setTextData((prevState) => {
      return [myObj, ...prevState];
    });
    console.log(myObj);
  };
  return (
    <div className="main">
      <form onSubmit={submitHandler}>
        <textarea type="text" ref={inputRef} />
        <button type="submit">Save</button>
      </form>
      <div className="main_content">
        <Keywords textData={textData} />
      </div>
    </div>
  );
};

export default Home;
