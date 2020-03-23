import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {retrieveCurrentChapter, updateChapterLocation, updateReadingInfo, startReader, endReader, setNextChapter, setPreviousChapter} from '../actions/currentChapter'
import {Row, Col, Container} from 'react-bootstrap'
import {Button, Icon, Progress} from 'semantic-ui-react'
import {getBookByChapter, calculatePercentOfChapterForCurrentPage} from '../utilities/helpers'




const readerStyles = {
    minWidth: '700px',
    maxWidth: '700px'
}

const readerContainerStyles = {
    marginTop: '25px'
}

const commentsContainerStyle = {

    textAlign: 'center',
    marginTop: '50px',
    marginBottom: '50px'
}

const progressContainerStyle = {
    marginTop: '15px',
    width: '20%',
    height: '20px'
}

const max_characters = 3100

function Reader({books, match, updateReadingInfo, updateChapterLocation, currentChapter, retrieveCurrentChapter, setNextChapter, setPreviousChapter, userId, ...props}) {
    

    const [showCommentsState, setShowCommentsState] = useState(false)
    
    useEffect(() => {
        const bookId = match.params.bookId
        retrieveCurrentChapter(userId, bookId)
    }, [])

    const handleTurnNextChapter = () => {

    }

    const showPreviousButton = () => {

        return currentChapter.number && (currentChapter.number > 1) || stillHasPreviousText()

    }

    const showNextButton = () => {

        return currentChapter.number && (currentChapter.number < getBookByChapter(books, currentChapter.book_id).chapter_count) || stillHasNextText()

    }

    const stillHasNextText = () => {

        return currentChapter.content && ((currentChapter.current_word + max_characters) < currentChapter.content.length)
    }

    const stillHasPreviousText = () => {

        return (currentChapter.current_word - max_characters) > 0

    }

    const handleTurnNextPage = () => {

        console.log("handle next page clicked")
        // if there is still text left in this chapter, show the next slice of text, and update backend
        if (stillHasNextText()) {
           // updateChapterLocation
           const newCharacterIndex = currentChapter.current_word + max_characters
           updateChapterLocation('currentChapter', newCharacterIndex) 
           // updateReadingInfo 
        
        }

        // else go to the next chapter, update backend
       
    }

    
    const handleTurnPreviousPage = () => {
        console.log("handle previous page clicked")
        
        // if its not the first page
        if (stillHasPreviousText()) {
           // updateChapterLocation
           const newCharacterIndex = currentChapter.current_word - max_characters
           updateChapterLocation('currentChapter', newCharacterIndex) 
           // updateReadingInfo 
        
        }

        // else go to the next chapter, update backend
       
    


    }


    return (
       

        <Container style={readerContainerStyles}>
             { currentChapter.content && console.log("content.length", currentChapter.content.length)}
            
  <Row>
    <Col> 
    
     {showPreviousButton() && <Button onClick={handleTurnPreviousPage}>
     
      <Button.Content  visible>
        <Icon name='arrow left' />
      </Button.Content>
     </Button> }
    
    </Col>
    <Col style={readerStyles}>
    <h2 id="chapter-title">{currentChapter.content && currentChapter.title}</h2>
    <div id="chapter-content">{currentChapter.content && currentChapter.content.substring(currentChapter.current_word, currentChapter.current_word + max_characters)}</div>
    {currentChapter.content && <div style={progressContainerStyle}><Progress percent={calculatePercentOfChapterForCurrentPage(currentChapter.content, currentChapter.current_word + max_characters)}>{calculatePercentOfChapterForCurrentPage(currentChapter.content, currentChapter.current_word + max_characters)}%</Progress></div>}
    </Col>
    <Col>
     {console.log("current chapter", currentChapter)} 
     { showNextButton() &&  <Button onClick={handleTurnNextPage}>
    <Button.Content  visible>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>}
    </Col>
  </Row>
  <Row style={commentsContainerStyle}>
      <Col></Col>
      <Col> {currentChapter.content && calculatePercentOfChapterForCurrentPage(currentChapter.content, currentChapter.current_word + max_characters) > 99  && <Button basic color='blue' onClick={() => setShowCommentsState(!showCommentsState)}>
      {showCommentsState ? 'Hide': 'Show'} Comments
     </Button>}
     </Col>
      <Col></Col>
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
        setPreviousChapter: (chapter) => dispatch(setPreviousChapter(chapter)),
        updateChapterLocation: (chapter, newCurrentWord) => dispatch(updateChapterLocation(chapter, newCurrentWord)),
        updateReadingInfo: (userId, bookId, chapterStoreName, newCurrentChapter, newCurrentWord) => dispatch(updateReadingInfo(userId, bookId, chapterStoreName, newCurrentChapter, newCurrentWord))
    


      }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Reader)