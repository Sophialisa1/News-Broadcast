import React from 'react';
import { useState } from "react";

export const UploadMedia = ({ showTab, uploadMedia }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [image, setImage] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [price, setPrice] = useState("");

  return (
    <>
      <div className={`user-news ${showTab === 2 ? "show" : "hide"}`}>
        <h1>Upload news</h1>

        <div className="author">
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            type="text"
            placeholder="Full Name"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="title">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            placeholder="News Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="categories">
          <label htmlFor="categories">Categories:</label>
          <input
            id="categories"
            type="text"
            placeholder="News Categories"
            required
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </div>

        <div className="image">
          <label htmlFor="image">Image:</label>
          <input
            id="image"
            type="text"
            placeholder="Image URL"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="newsContent">
          <label htmlFor="newsContent">
            News Content(not more than 100 words)
          </label>
          <textarea
            id="newsContent"
            placeholder="News goes here..."
            value={newsContent}
            onChange={(e) => setNewsContent(e.target.value)}
          ></textarea>
        </div>

        <div className="price">
          <label htmlFor="price">Price to be payed:</label>
          <input
            id="price"
            type="number"
            placeholder="Price to be payed"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="article-btn">
          <button
            id="uploadNewsButton"
            onClick={() =>
              uploadMedia(author, title, categories, image, newsContent, price)
            }
          >
            Upload <span className="loader"></span>
          </button>
        </div>
      </div>
    </>
  );
};
