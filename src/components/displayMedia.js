import React from 'react';
import { useState } from "react";

export const displayMedia = (props) => {

  const [newnewsContent, setNewsContent] = useState('');
  const [newprice, setPrice] = useState('');


  return <div className="card-container">

{props.news.map((news) =>(
    <div class="card">
    <img class="card-img-top" src={news.image} alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title">{news.author}</h5>
      <h3 class="card-title">{news.title}</h3>
      <h5 class="card-title">{news.categories}</h5>
      <p class="card-text">{news.newsContent}</p>
      <h5 class="card-title">Price: {news.price  / 1000000000000000000}cUSD</h5>
      <h6 class="card-title">Sold:</h6>

      { props.walletAddress !== news.owner &&(
      <button type="button" onClick={()=>props.buyNews(news.index)} class="btn btn-primary mt-2">Purchase News</button>
      )
}

{ props.walletAddress === news.owner && (
     <form>
  <div class="form-r">
      <input type="text" class="form-control mt-4" value={newprice}
           onChange={(e) => setPrice(e.target.value)} placeholder="new price"/>
      <button type="button" onClick={()=>props.updatePrice(news.index, newprice)} class="btn btn-primary mt-2">Update Price</button>
      
  </div>
</form>
)}

{ props.walletAddress === news.owner && (
     <form>
  <div class="form-r">
      <input type="text" class="form-control mt-4" value={newNewsContent}
           onChange={(e) => setNewsContent(e.target.value)} placeholder="edit news content"/>
      <button type="button" onClick={()=>props.editNewsContent(news.index, newnewsContent)} class="btn btn-primary mt-2">Edit News Content</button>
      
  </div>
</form>
)}


      { props.walletAddress === news.owner &&(
                    <button
                      type="submit"
                      onClick={() => props.removeMedia(news.index)}
                      className="btn btn-primary m-3"
                    >
                      Delete Media
                    </button>
                       )}
    </div>
  </div>
  ))}

</div>
};

export default displayMedia;