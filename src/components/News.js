import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country :'us',
    pageSize: 6,
    category:'general'
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }
    async componentDidMount(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3210b24bac564902a4bf33580792cfbd&page=1&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false})
      
    }

    handlePrevClick = async ()=>{
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3210b24bac564902a4bf33580792cfbd&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        page: this.state.page -1,
        articles: parsedData.articles,
        loading:false
      })
    }
    handleNextClick = async ()=>{
      // if(!this.state.page+1 > Math.round(this.state.totalResults/`${this.props.pageSize}`)){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3210b24bac564902a4bf33580792cfbd&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        page: this.state.page +1,
        articles: parsedData.articles,
        loading:false
      })
    // }
    }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">HeadlineHub</h2>
        {this.state.loading && <Loading/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title.slice(0, 45):""}
                  description={element.description?element.description.slice(0, 87):""}
                  imgUrl={element.urlToImage}
                  url={element.url}
                  publishedAt={element.publishedAt}
                  source = {element.source.name}
                />
              </div>  
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-primary"> &laquo; Previous</button>
        <button disabled={this.state.page+1 > Math.round(this.state.totalResults/`${this.props.pageSize}`)} type="button" onClick={this.handleNextClick} className="btn btn-primary">Next  &raquo; </button>
        </div>
      </div>
    );
  }
}

export default News;
