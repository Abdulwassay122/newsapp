import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, url, publishedAt, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <span class="position-absolute top-0 translate-bottom badge rounded-pill bg-primary m-1" style={{zIndex:1,      }}>
            {source}
          </span>
          <img
            src={
              imgUrl === null
                ? "https://images.mktw.net/im-17528200/social"
                : imgUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                Published at {new Date(publishedAt).toGMTString()}
              </small>
            </p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
