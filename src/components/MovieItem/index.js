import './index.css'
import {Component} from 'react'

class MovieItem extends Component {
  state = {dogImage: ''}

  componentDidMount() {
    this.getDogImg()
  }

  getDogImg = async () => {
    const url = 'https://dog.ceo/api/breeds/image/random'
    const response = await fetch(url)
    const responseObj = await response.json()
    const dogImage = responseObj.message
    this.setState({dogImage})
  }

  render() {
    const {dogImage} = this.state
    const {movieDetails} = this.props
    const {title} = movieDetails
    return (
      <li className="movie-card">
        <img src={dogImage} className="dog-image" />
        <p className="movie-para">Movie: {title}</p>
      </li>
    )
  }
}

export default MovieItem
