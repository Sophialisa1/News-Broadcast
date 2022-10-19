import React from 'react';
import { useState } from "react";

export const DisplayMedia = ({ showTab }) => {
  // const [newnewsContent, setNewsContent] = useState("");
  // const [newprice, setPrice] = useState("");

  return (
    <>
      <div className={`news-container  ${showTab === 3 ? "show" : "hide"}`}>
        <h1>available news</h1>

        <div className="news">
          <div className="news"></div>
        </div>
      </div>
    </>
  );
};

export default DisplayMedia;