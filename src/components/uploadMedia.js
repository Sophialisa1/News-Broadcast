import React from 'react';
import { useState } from "react";

export const UploadMedia = ({ showTab }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [image, setImage] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [price, setPrice] = useState("");

  return (
    // <div>
    //   <form>
    //     <div className="form-row">
    //       <input
    //         type="text"
    //         className="form-control"
    //         value={author}
    //         onChange={(e) => setAuthor(e.target.value)}
    //         placeholder="author"
    //       />

    //       <input
    //         type="text"
    //         className="form-control"
    //         value={title}
    //         onChange={(e) => setTitle(e.target.value)}
    //         placeholder="title"
    //       />

    //       <input
    //         type="text"
    //         className="form-control mt-2"
    //         value={categories}
    //         onChange={(e) => setCategories(e.target.value)}
    //         placeholder="categories"
    //       />

    //       <input
    //         type="text"
    //         className="form-control mt-2"
    //         value={image}
    //         onChange={(e) => setImage(e.target.value)}
    //         placeholder="image"
    //       />

    //       <input
    //         type="text"
    //         className="form-control mt-2"
    //         value={newsContent}
    //         onChange={(e) => setNewsContent(e.target.value)}
    //         placeholder="newsContent"
    //       />

    //       <input
    //         type="text"
    //         className="form-control mt-2"
    //         value={price}
    //         onChange={(e) => setPrice(e.target.value)}
    //         placeholder="price"
    //       />

    //       <button
    //         type="button"
    //         onClick={() =>
    //           props.uploadMedia(
    //             author,
    //             title,
    //             categories,
    //             image,
    //             newsContent,
    //             price
    //           )
    //         }
    //         className="btn btn-primary mt-2"
    //       >
    //         Upload News
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <>
      <div className={`user-news ${showTab === 2 ? "show" : "hide"}`}>
        <h1>Upload news</h1>

        <div className="author">
          <label htmlFor="author">Author:</label>
          <input id="author" type="text" placeholder="Full Name" required />
        </div>

        <div className="title">
          <label htmlFor="title">Title:</label>
          <input id="title" type="text" placeholder="News Title" required />
        </div>

        <div className="categories">
          <label htmlFor="categories">Categories:</label>
          <input
            id="categories"
            type="text"
            placeholder="News Categories"
            required
          />
        </div>

        <div className="image">
          <label htmlFor="image">Image:</label>
          <input id="image" type="text" placeholder="Image URL" required />
        </div>

        <div className="newsContent">
          <label htmlFor="newsContent">
            News Content(not more than 100 words)
          </label>
          <textarea id="newsContent" placeholder="News goes here..."></textarea>
        </div>

        <div className="price">
          <label htmlFor="price">Price to be payed:</label>
          <input
            id="price"
            type="number"
            placeholder="Price to be payed"
            required
          />
        </div>

        <div className="article-btn">
          <button id="uploadNewsButton">
            Upload <span className="loader"></span>
          </button>
        </div>
      </div>
    </>
  );
};
