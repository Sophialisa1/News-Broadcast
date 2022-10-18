import React from 'react';
import { useState } from "react";

export const UploadMedia = (props) => {

const [author, setAuthor] = useState('');
const [title, setTitle] = useState('');
const [categories, setCategories] = useState('');
const [image, setImage] = useState('');
const [newsContent, setNewsContent] = useState('');
const [price, setPrice] = useState('');


  return <div>
      <form>
  <div class="form-row">
    
  <input type="text" class="form-control" value={author}
           onChange={(e) => setAuthor(e.target.value)} placeholder="author"/>

      <input type="text" class="form-control" value={title}
           onChange={(e) => setTitle(e.target.value)} placeholder="title"/>
           
      <input type="text" class="form-control mt-2" value={categories}
           onChange={(e) => setCategories(e.target.value)} placeholder="categories"/>

      <input type="text" class="form-control mt-2" value={image}
           onChange={(e) => setImage(e.target.value)} placeholder="image"/>

      <input type="text" class="form-control mt-2" value={newsContent}
           onChange={(e) => setNewsContent(e.target.value)} placeholder="newsContent"/>

      <input type="text" class="form-control mt-2" value={price}
           onChange={(e) => setPrice(e.target.value)} placeholder="price"/>

      <button type="button" onClick={()=>props.uploadMedia(author, title, categories, image, newsContent, price)} class="btn btn-primary mt-2">Upload News</button>
  </div>
</form>
  </div>;
};
