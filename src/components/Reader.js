import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {retrieveCurrentChapter, startReader, endReader, setNextChapter, setPreviousChapter} from '../actions/currentChapter'
import {Row, Col, Container} from 'react-bootstrap'
import {Button, Icon} from 'semantic-ui-react'




const readerStyles = {
    minWidth: '700px',
    maxWidth: '700px'
}

const readerContainerStyles = {
    marginTop: '25px'
}

const max_characters = 3100

function Reader({books, match, currentChapter, retrieveCurrentChapter, setNextChapter, setPreviousChapter, userId, ...props}) {


  

    
    useEffect(() => {
        const bookId = match.params.bookId
        retrieveCurrentChapter(userId, bookId)
    }, [])




    return (

        <Container style={readerContainerStyles}>
            
  <Row>
    <Col> 
    
     {<Button>
     
      <Button.Content visible>
        <Icon name='arrow left' />
      </Button.Content>
     </Button> }
    
    </Col>
    <Col style={readerStyles}>
    <h2 id="chapter-title">{currentChapter.content && currentChapter.title}</h2>
    <div id="chapter-content">{currentChapter.content && currentChapter.content.substring(currentChapter.current_word, currentChapter.current_word + max_characters)}</div>
    
    </Col>
    <Col>
     <Button>
    <Button.Content visible>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
    </Col>
  </Row>
</Container>
       
      
      
       
         
       
       
      )
}

const mapStateToProps = (state) => {
    return {
        books: state.library.userBooks,
        currentChapter: state.currentChapter.currentChapter,
        userId: state.auth.userId
    }
 }
 
 const mapDispatchToProps = (dispatch) => {

      return {

        startReader: () => dispatch(startReader()), 
        endReader: () => dispatch(endReader()),
        retrieveCurrentChapter: (userId, bookId) => dispatch(retrieveCurrentChapter(userId, bookId)),
        setNextChapter: (chapter) => dispatch(setNextChapter(chapter)),
        setPreviousChapter: (chapter) => dispatch(setPreviousChapter(chapter))
    


      }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Reader)