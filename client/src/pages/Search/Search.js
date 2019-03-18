import React, { Component } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import Header from '../../components/Header/Header';
import ArticleList from '../../components/ArticleList/ArticleList';

import './Search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      totalResults: 0,
      searchInput: 'space',
      searchAll: true,
    };
  }
  componentDidMount() {
    this.queryNewsArticles();
  }

  handleSearchInputChange = event => {
    this.setState({ searchInput: event.target.value });
    const debouncedQueryNewsArticles = debounce(this.queryNewsArticles, 200);
    debouncedQueryNewsArticles();
  };

  queryNewsArticles = () => {
    const { searchInput, searchAll } = this.state;
    axios
      .get(`/news/${searchAll}/${searchInput}`)
      .then(response => {
        const { articles, totalResults } = response.data;
        this.setState({ articles, totalResults });
      })
      .catch(console.log);
  };

  handleSearchTypeChange = event => {
    const checked = event.target.checked;
    this.setState({ searchAll: checked }, () => this.queryNewsArticles());
  };
  render() {
    const { articles, searchAll, totalResults, searchInput } = this.state;

    return (
      <React.Fragment>
        <Header
          handleSearchInputChange={this.handleSearchInputChange}
          handleSearchTypeChange={this.handleSearchTypeChange}
          searchAll={searchAll}
          searchInput={searchInput}
        />
        <main className="search-results">
          <div className="search-results__text-content">
            <h1 className="search-results__headline">
              You searched{' '}
              <span className="search-results__meta-data">{searchInput}</span>
            </h1>
            <span className="search-results__headline">
              We found{' '}
              <span className="search-results__meta-data">{totalResults}</span>{' '}
              results!
            </span>
          </div>
          <div className="search-results__list">
            <ArticleList articles={articles} />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Search;