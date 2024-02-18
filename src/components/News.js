import React, { Component } from "react";
import NewsItem from "./NewsItem.js"  ;
import Spinner from './Spinner' ;
import PropTypes from 'prop-types' ;
import InfiniteScroll from "react-infinite-scroll-component" ;
export class News extends Component {
    static defaultProps = {
      country : "in" ,
      pageSize : 10  ,
      category : 'general'
    } 
    static propTypes = {
      country : PropTypes.string,
      pageSize : PropTypes.number  ,
      category : PropTypes.string
    } 
    CapitalizeFirstLetter = (string) =>{
      return string.charAt(0).toUpperCase() + string.slice(1) ;
    }
    constructor(props) {
      super(props); // This is imp. to write if constructor is  called
      console.log("This is a Constructor from news component");
      this.state = {
        articles: [] ,
        loading: true,
        page:1 ,
        totalResults : 0 ,
      };
      document.title = `${this.CapitalizeFirstLetter(this.props.category)} - News Jugaar` ;
    }
  async UpdateNews () {
    console.log("componentDidMount") ;
    this.props.setProgress(10) ;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f22374bc4b5f48629dd09f3e9c227f9a&page=${this.state.page}pagesize=${this.props.pageSize}` ;
    this.props.setProgress(30) ;

    let data = await fetch(url) ;
    let parsedData = await data.json() ;
    this.props.setProgress(70) ;

    console.log(parsedData) ;
    this.setState({
      articles : parsedData.articles , 
      totalResults : parsedData.totalResults , 
      loading : false  ,
    }) ;
    this.props.setProgress(100) ;
  }
  async componentDidMount(){
    this.UpdateNews() ;
  }

  // handlePreviouspage = async () =>{
  //   this.setState({page: this.state.page - 1}) ;
  //   this.UpdateNews() ;
  // }
  // handleNextpage = async () =>{
  //   this.setState({page: this.state.page + 1}) ;
  //   this.UpdateNews() ;
  // }

  fetchMoreData = async () => {
    this.setState({page : this.state.page + 1}) ;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f22374bc4b5f48629dd09f3e9c227f9a&page=${this.state.page}pagesize=${this.props.pageSize}` ;
    let data = await fetch(url) ;
    let parsedData = await data.json() ;
    console.log(parsedData) ;
    this.setState({
      articles : this.state.articles.concat(parsedData.articles) , 
      totalResults : parsedData.totalResults , 
    }) ;
  };
  render() {
    console.log("render")   ;
    return (
      <div className="container my-4">
        <h1 className="text-center ">News Jugaar - Top {this.CapitalizeFirstLetter(this.props.category)} Headlines</h1>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.totalResults}
          // hasMore={this.state.page * this.props.pageSize < this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

        {/* {this.state.loading && <Spinner/>} */}
        <div className="row">
          {this.state.articles.map((element)=>{
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ?element.title.slice(0,50) : "Explore this intriguing news feed for updates..."}
                  description={element.description ? element.description.slice(0, 90) : ""}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  author = {element.author} 
                  date = {element.publishedAt} 
                  source = {element.source.name}
                />
              </div>
              );
          })}
        </div>
      </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
