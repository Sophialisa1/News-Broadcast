import React from "react";
import { useState } from "react";

export const DisplayMedia = ({
  showTab,
  i,
  news,
  updatePrice,
  editNewsContent,
  removeMedia,
  buyNews,
}) => {
  const [newnewsContent, setNewNewsContent] = useState("");
  const [newprice, setNewPrice] = useState("");
  const { index, image, title, categories, newsContent, price, sold, author } =
    news;
  console.log(news);
  const [editPrice, setEditPrice] = useState(false);
  const [editContent, setEditContent] = useState(false);
  return (
    <>
      <div className="col" style={{ maxWidth: "300px" }} key={i}>
        <div className="card my-5">
          <img src={image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              <ul className="nav flex-column">
                <li>
                  <b>author: </b>
                  {author}
                </li>
                <li>
                  <b>Categories:</b>
                  {categories}
                </li>
                <li>
                  <b> News Content:</b> <br />
                  {editContent ? (
                    <>
                      <textarea
                        name=""
                        id=""
                        cols="5"
                        className="form-control"
                        rows="5"
                        value={newnewsContent}
                        onChange={(e) => {
                          setNewNewsContent(e.target.value);
                        }}
                      ></textarea>
                      <button
                        className=" btn btn-primary btn-sm h-25 mt-auto"
                        onClick={() => {
                          // this is the button that will update News Content when the user clicks on the it.
                          // leave them it will work if u fix the backend
                          editNewsContent(index, newnewsContent);
                          // this one function that will hide the editcontent form after update
                          setEditContent(false);
                        }}
                      >
                        submit
                      </button>
                    </>
                  ) : (
                    <>
                      {" "}
                      <p
                        className=" m-0 "
                        style={{
                          maxHeight: "100px",
                          overflow: "hidden",
                        }}
                      >
                        {newsContent}
                      </p>{" "}
                      <br />
                      <button
                        className="btn btn-primary btn-sm mt-0"
                        onClick={() => {
                          setNewNewsContent(newsContent);
                          setEditContent(true);
                        }}
                      >
                        Update Content
                      </button>
                    </>
                  )}
                </li>
                <li>
                  <b>price:</b> {price / 1000000000000000000}
                </li>
                <li>
                  <b>sold: </b>
                  {sold}
                </li>
              </ul>
            </p>
            <div className="d-flex">
              {editPrice ? (
                <>
                  <input
                    type="text"
                    value={newprice}
                    onChange={(e) => {
                      setNewPrice(e.target.value);
                    }}
                  />{" "}
                  <button
                    className=" btn btn-primary btn-sm"
                    onClick={() => {
                      // this is the button that will updatePrice when the user clicks on the it.
                      // leave them it will work if u fix the backend
                      updatePrice(index, newprice);
                      // this one function that will hide the editPrice form after update
                      setEditPrice(false);
                    }}
                  >
                    submit
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setNewPrice(price / 1000000000000000000);
                      setEditPrice(true);
                    }}
                  >
                    Update price
                  </button>
                </>
              )}
            </div>
            <button className="btn btn-primary" onClick={() => buyNews(index)}>
              Buy
            </button>
            <button
              className="btn btn-danger"
              onClick={() => removeMedia(index)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayMedia;
