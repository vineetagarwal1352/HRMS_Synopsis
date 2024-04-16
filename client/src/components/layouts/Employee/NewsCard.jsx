import React, { Component } from 'react'
import '../../../assets/newsCard.css'

export default class NewsCard extends Component {
  onGetTitle = title => {
    return title.split('-')[0]
  }
  onGetImage = image => {
    return image
  }
  onGetArticle = url => {
    return url
  }
  // onGetDescription = description => {
  //   return description
  // }
  onGetDescription = description => {
    // Split the description into words
    const words = description.split(' ')

    // Choose the number of words to display
    const numWordsToShow = 20 // Change this number as needed

    // Join the first 'numWordsToShow' words and add ellipsis if there are more words
    const truncatedDescription = words.slice(0, numWordsToShow).join(' ')

    // Return the truncated description
    return truncatedDescription + (words.length > numWordsToShow ? '...' : '')
  }
  render() {
    const { url, title, image, description } = this.props.data
    return (
      <div className="newsContainer">
        <h6 className="titleText">{this.onGetTitle(title)}</h6>

        <hr />

        <img src={this.onGetImage(image)} alt="" className="newsImg" />

        <p className="descriptionText">{this.onGetDescription(description)}</p>

        <a
          href={this.onGetArticle(url)}
          target="_blank"
          style={{
            color: '#FF4500',
            textDecoration: 'none',
            cursor: 'pointer',
            display: 'block'
          }}
        >
          <h6 className="mt-2 text-right linkToArticle">
            Link to full article
          </h6>
        </a>
      </div>
    )
  }
}
