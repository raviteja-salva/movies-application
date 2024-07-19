import {Component} from 'react'
import {IoSearchSharp} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import MovieItem from '../MovieItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Movies extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    moviesList: [],
  }

  movieObj = obj => ({
    authorName: obj.author_name,
    title: obj.title,
  })

  getMoviesDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {searchInput} = this.state
    const searchKeyWord = searchInput.split(' ').join('+')
    const url = `https://openlibrary.org/search.json?title=${searchKeyWord}`
    const response = await fetch(url)
    const responseArray = await response.json()
    const dataArray = responseArray.docs.map(eachObj => this.movieObj(eachObj))

    if (response.ok) {
      this.setState({
        moviesList: dataArray,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderInitialView = () => (
    <div className="view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        className="search-img"
      />
    </div>
  )

  renderLoadingView = () => (
    <div className="view-container">
      <Loader type="ThreeDots" color="#ff0000" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        className="search-img"
      />
      <h1 className="movies-heading">Not Found</h1>
    </div>
  )

  renderSuccessView = () => {
    const {moviesList} = this.state

    return (
      <ul className="movies-list-container">
        {moviesList.map(movie => (
          <MovieItem movieDetails={movie} />
        ))}
      </ul>
    )
  }

  renderMoviesContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderInitialView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="container">
        <h1 className="movies-heading">Movies</h1>
        <div className="input-container">
          <input
            type="search"
            placeholder="Enter movie name..."
            className="search-input"
            value={searchInput}
            onChange={this.changeSearchInput}
          />
          <button className="search-button" onClick={this.getMoviesDetails}>
            <IoSearchSharp aria-label="search" />
          </button>
        </div>
        {this.renderMoviesContent()}
      </div>
    )
  }
}

export default Movies
