import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitaliseFirstLetter = (word)=>{
    return word.charAt(0).toUpperCase()+word.slice(1);
  }

  constructor(props) {
    super(props);
    // console.log("Hello I am a constructor from new component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
    document.title=`${this.capitaliseFirstLetter(this.props.category)} - NewsMonkey`
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=45d7e2078f564c0180eaf7ad3f0f7b2e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults });
  }

  async fetchArticles() {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=45d7e2078f564c0180eaf7ad3f0f7b2e&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }

      const data = await response.json();
      this.setState({ articles: data.articles, loading: false });
    } catch (error) {
      console.error('Error fetching articles:', error);
      this.setState({ loading: false });
    }
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 }, async () => {
      console.log(Math.ceil(this.state.totalArticles/this.props.pageSize)===this.state.page);
      await this.fetchArticles();
    });
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 }, async () => {
      await this.fetchArticles();
    });
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>News-Monkey Top Headlines from {this.capitaliseFirstLetter(this.props.category)}</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} newsUrl={element.url} imageUrl={element.urlToImage} dateTime={element.publishedAt} author={element.author}></NewsItem>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
          <button disabled={Math.ceil(this.state.totalArticles/this.props.pageSize)===this.state.page} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
