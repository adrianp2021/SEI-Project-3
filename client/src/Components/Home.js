/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { definedRating } from '../sematinicElements/ratings.js'
import Searchbar from './Searchbar'



const Home = () => {

  const [godsData, setGodsData] = useState([])
  const [comments, setComments] = useState([])
  const [categories, setCategories] = useState([])
  const [errors, setErrors] = useState(false)


  useEffect(() => {

    const getData = async () => {
      setErrors(false)
      try {

        const { data } = await axios.get('/api/gods')

        // console.log('GET RQST DATA', data)

        // console.log('DATA', data.filter(item => item.comments.length > 0))

        setGodsData(data)

        const godsWithActiveComments = data.filter(item => item.comments.length > 0)

        const commentsArray = []

        const categoriesArray = []

        data.map(item => {
          // console.log(item.species)
          if (categoriesArray.indexOf(item.species) < 0) {
            // console.log('INDEX', categoriesArray.indexOf(item.species))
            categoriesArray.push(item.species)
          }
        })

        // console.log('COMMENTS', godsWithActiveComments.map(item => item.comments))

        const commentsFromGods = godsWithActiveComments.map(item => item.comments)

        commentsFromGods.map(item => item.map(comment => {
          commentsArray.push(comment)
        }))

        // console.log('COMMENTS ARRAY', commentsArray)
        // console.log('COMMENTS ARRAY', commentsArray.map(item => item.text))

        setComments(commentsArray)
        setCategories(categoriesArray)

        // setComments(data.map(item => item.comments.map(item => item)))

      } catch (err) {
        console.log('COMMENTS ERROR', err.message)
        setErrors(true)
      }
    }

    getData()

  }, [])

  // console.log('CATEGORIES', categories)

  return (
    <>
      <>
        <section className="hero-container">

          <div className='search-container'>

            <div className="search-container-content">

              <h2 className="search-header">Behind every review is an experience that matters</h2>

              <h2 className="search-subheader">Read reviews. Write reviews. Find gods.</h2>

              <div className="searchBar-container">
                {/* <form className="home-searchbar">
                  <input className="searchbar" placeholder="God or god types" />

                  <div className="button-container">
                    <button className="hero-search-button">search</button>
                  </div>
                </form> */}
                {/* {console.log('GODS DATA BEFORE', godsData)} */}
                <Searchbar godsData={godsData} />
              </div>


              <div className="categories-container">


                <div className="categories-tagline">
                  Browse gods by category
                </div>

                <div className="categories-button-container">

                  {categories.length > 0 &&

                    categories.map(item => {
                      return (
                        <div key={item}>
                          <Link to={`/categories/${item}`}>
                            <div className="category-button">
                              {item}
                            </div>
                          </Link>
                        </div>
                      )
                    })

                  }

                  <Link to="/categories">
                    <div className="category-button">
                      ...
                    </div>
                  </Link>

                </div>

              </div>

            </div>
          </div>


        </section>

        <section>

          <div className="comments-container-heading">
            Recent reviews
          </div>

          {comments.length > 0 &&

            <div className='scrolling-comments-container'>

              {comments.map(item =>
                <>
                  <div key={item._id} className="comment-div">

                    <div className="comment-header">
                      <div className="comment-profile-pic "></div>
                      <div className="comment-rating">{definedRating(item.rating)}</div>
                    </div>
                    <div className="engraved comment-owner-text">
                      <p>
                        <span className="bold">{item.ownerUsername} </span>  reviewed  <span className="bold">{item.placeholderAboutGod}</span>
                      </p>
                    </div>

                    <div className="comment-text-body-container">
                      <h4 className="engraved comment-text-body">{item.text}</h4>
                    </div>

                  </div>
                </>
              )}
            </div>
          }
        </section>

        <section className="home-banner">

          <div className="home-banner-inner">

            <div className="home-banner-container">

              <h2>Be heard</h2>

              <p>Trust Pistis is free and open to every god and follower everywhere. Sharing your experiences helps others make better choices and gods up their game.</p>

              <Link to="/about">
                <div className="banner-button">
                  What we do
                </div>
              </Link>

            </div>

            <div className="home-banner-container trust">

              <h2>We protect and promote trust</h2>

              <p>Trust Pistis is based on Trustpilot</p>

              <a href="https://www.trustpilot.com/">
                <div className="banner-button">
                  Take a look
                </div>
              </a>

            </div>

          </div>

        </section>

        <section className="personal-stories">

          <div className="comments-container-heading">
            Your stories
          </div>
          <div className="homepage-tagline">
            <h2 className="search-header">Each review has a personal story</h2>
          </div>

          <div className="stories-figure">

            <div className="stories-image" alt="Prometheus">
              {/* <img className="stories-image" src={prometheus} alt="Prometheus" /> */}

              <div className="review-card">

                <div className="review-content">
                  <div className="review-rating">
                    {definedRating(1)}
                  </div>

                  <div className="review-text">He chained me to a rock to have an eagle eat my liver for eternity because I gave fire to humans.</div>
                  <div className="review-owner-text"><span className="bold">Prometheus </span> experienced <span className="bold"> Zeus</span></div>
                </div>
              </div>
            </div>


          </div>


        </section>

      </>
    </>
  )
}

export default Home