import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromStorage } from './Authentification/auth'
import { Button, Form, Segment, Grid, Image, Rating } from 'semantic-ui-react'


const CommentEdit = () => {

  const history = useHistory()
  const { name, commentId } = useParams()

  const [commentDataEdit, setCommentDataEdit] = useState({
    text: '',
    rating: '',
    textHeader: '',
  })

  const [errors, setErrors] = useState({
    text: '',
    rating: '',
    textHeader: '',
  })
  
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/gods/${name}/comments/${commentId}`)
      console.log('DATA >>>', data)
      setCommentDataEdit(data)
    }
    getData()
  }, [commentId, name])

  console.log('INCOMiNG DATA', commentDataEdit)

  const handleTextChange = (event) => {
    const newCommentData = { ...commentDataEdit, [event.target.name]: event.target.value }
    const newErrors = { ...errors, [event.target.name]: '' }
    setCommentDataEdit(newCommentData)
    setErrors(newErrors)
  }

  const handleRatingChange = (event, data) => {
    const getRatingNumber = { ...commentDataEdit, [data.name]: data.rating }
    const newError = { errors, [event.target.name]: '' }
    setCommentDataEdit(getRatingNumber)
    setErrors(newError)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.put(`/api/gods/${name}/comments/${commentId}`, commentDataEdit,
        {
          headers: {
            Authorization: `Bearer ${getTokenFromStorage()}` },
        }
      )
      history.push(`/gods/${name}`)
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }





  return (

    <>
      
      <div className='display-god-top-part-margin'>
        <Grid className='comment-top-part'>
          <Grid.Column className='info-page-width-two'>
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          </Grid.Column>
        </Grid>
      
        <div className="comment-background">

          <Segment className='comment-box'>
      
            <div className="container-area-text">
              <h3 className='comment-heading'>Rate your recent experience</h3>


              <Form onSubmit={handleSubmit}>

                {<Rating 
                  maxRating={5} 
                  
                  icon='star' 
                  size='massive'
                  name='rating' 
                  rating={commentDataEdit.rating}
                  onRate={handleRatingChange}
                />}
             

                <h3 className='comment-heading'>Tell us about your experience</h3>

                <p className='comment-parahraph'>Read our Guidelines for Reviewers</p>

                <div className='max-comment-form-width'>
                  <Form.TextArea
                    fluid 
                    className='form-field-height'
                    type="text"
                    placeholder='This is where you write your review. Explain what happened, and leave out offensive words. Keep your feedback honest, helpful, and constructive.' 
                    required 
                    name='text'
                    value={commentDataEdit.text}
                    onChange={handleTextChange}
                  />
                </div>

                <p className='comment-parahraph'>How to write a useful review</p>

                <h3 className='comment-heading'>Tell us about your experience</h3>
                
                <Form.Field>
                  <input
                    type="text" 
                    placeholder='Write the title of your review here?' 
                    required 
                    name='textHeader'
                    value={commentDataEdit.textHeader}
                    onChange={handleTextChange}
                  />
                </Form.Field>

                <Button className='comment-submit-button' type='submit'>Submit</Button>
                <Button className='comment-submit-button delete-button-color' type='submit'>Delete</Button>
              </Form>

            </div>
          </Segment>
        </div>
      </div>
    </>

  )

}







export default CommentEdit