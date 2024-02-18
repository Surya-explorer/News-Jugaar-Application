import React, { Component } from "react";
export class NewsItem extends Component {
  render() {
    let {title , description , imageurl , newsurl ,author, date  , source} = this.props ;
    return (
      <div className = "my-3">
        <div className="card">
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style = {{left : '80%' , zIndex : '1'}}>{source}</span>
         {/* style={width: "18rem"}  --> Single curly braces {} is used for representing the javscript */}

        {/* style={width: "18rem"}  --> Double curly braces {{}} is used for representing the Object in JS*/}

        {/* Following img tag says if the imageurl is null then take the given link otherwise take imageurl */}
          <img src= {imageurl? imageurl : "https://cdn.wionews.com/sites/default/files/2023/12/30/402617-yearender-2023-6.png" } className= "card-img-top" alt="..."  style={{ height: '300px', objectFit: 'cover' }} />
          <div className="card-body">
            <h5 className="card-title">{title}
            </h5>
            <p className="card-text">
              {description ? description : "Latest updates on global events, stay informed with reliable sources. Breaking news coverage ."}
            </p>
            <p className = "card-text"> <small className = "text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a rel ="noreference" href={newsurl} target="_blank" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
