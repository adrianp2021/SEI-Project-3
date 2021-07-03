/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useState, useEffect } from 'react'


const Home = () => {

  const [comments, setComments] = useState([])
  const [errors, setErrors] = useState(false)


  useEffect(() => {

    const getData = async () => {
      setErrors(false)
      try {

        const { data } = await axios.get('/api/gods')

        // console.log('GET RQST DATA', data)

        // console.log('DATA', data.filter(item => item.comments.length > 0))

        const godsWithActiveComments = data.filter(item => item.comments.length > 0)

        const commentsArray = []

        // console.log('COMMENTS', godsWithActiveComments.map(item => item.comments))

        const commentsFromGods = godsWithActiveComments.map(item => item.comments)

        commentsFromGods.map(item => item.map(comment => {
          commentsArray.push(comment)
        }))

        // console.log('COMMENTS ARRAY', commentsArray)
        // console.log('COMMENTS ARRAY', commentsArray.map(item => item.text))

        setComments(commentsArray)
        // setComments(data.map(item => item.comments.map(item => item)))

      } catch (err) {
        console.log('COMMENTS ERROR', err.message)
        setErrors(true)
      }
    }

    getData()

  }, [])

  return (
    <>
      <>
        <div className="hero-container">

          <div className='search-container'>

            <div className="search-container-content">

              <h2 className="search-header">Behind every review is an experience that matters</h2>

              <h2 className="search-subheader">Read reviews. Write reviews. Find gods.</h2>

              <div className="searchBar-container">
                <form className="home-searchbar">
                  <input className="searchbar" placeholder="God or god types" />

                  <div className="button-container">
                    <button className="hero-search-button">search</button>
                  </div>
                </form>
              </div>

            </div>

          </div>

        </div>
        {/* {comments && comments.map(item => item.name)} */}
        {comments && comments.map(item => <h4 key={item._id}>{item.text} {item.rating}</h4>)}
      </>
    </>
  )
}
export default Home